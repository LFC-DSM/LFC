import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { AccessTokenStrategy } from '../../../src/global/jwt/access-token.strategy'
import { ACCESS_SECRET, authenticate, signToken } from './jwt-test.util'

function configService(values: Record<string, string | undefined>) {
  return {
    get: (key: string, defaultValue?: string) =>
      Object.prototype.hasOwnProperty.call(values, key) ? values[key] : defaultValue,
  }
}

async function createStrategy(
  values: Record<string, string | undefined> = { JWT_ACCESS_SECRET: ACCESS_SECRET },
) {
  const moduleRef = await Test.createTestingModule({
    providers: [
      AccessTokenStrategy,
      {
        provide: ConfigService,
        useValue: configService(values),
      },
    ],
  }).compile()

  return moduleRef.get(AccessTokenStrategy)
}

describe('AccessTokenStrategy', () => {
  it('maps a valid bearer token subject to the member id', async () => {
    const strategy = await createStrategy()
    const token = signToken({ sub: 42 }, ACCESS_SECRET)

    await expect(authenticate(strategy, { authorization: `Bearer ${token}` })).resolves.toEqual({
      id: 42,
    })
  })

  it('returns only the member id from the payload', async () => {
    const strategy = await createStrategy()

    expect(strategy.validate({ sub: 7 })).toEqual({ id: 7 })
  })

  it('rejects a request without a bearer token', async () => {
    const strategy = await createStrategy()
    const token = signToken({ sub: 42 }, ACCESS_SECRET)

    await expect(authenticate(strategy, {})).rejects.toThrow('No auth token')
    await expect(authenticate(strategy, { 'x-refresh-token': token })).rejects.toThrow(
      'No auth token',
    )
  })

  it('rejects a token signed with a different secret', async () => {
    const strategy = await createStrategy()
    const token = signToken({ sub: 42 }, 'other-secret')

    await expect(authenticate(strategy, { authorization: `Bearer ${token}` })).rejects.toThrow(
      'invalid signature',
    )
  })

  it('rejects an expired access token', async () => {
    const strategy = await createStrategy()
    const token = signToken({ sub: 42 }, ACCESS_SECRET, -10)

    await expect(authenticate(strategy, { authorization: `Bearer ${token}` })).rejects.toThrow(
      'jwt expired',
    )
  })

  it('refuses to start when the access secret is missing', async () => {
    await expect(createStrategy({})).rejects.toThrow('JwtStrategy requires a secret or key')
  })
})
