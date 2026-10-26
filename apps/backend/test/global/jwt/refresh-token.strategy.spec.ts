import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { Request } from 'express'
import { RefreshTokenStrategy } from '../../../src/global/jwt/refresh-token.strategy'
import { authenticate, REFRESH_SECRET, signToken } from './jwt-test.util'

function configService(values: Record<string, string | undefined>) {
  return {
    get: (key: string, defaultValue?: string) =>
      Object.prototype.hasOwnProperty.call(values, key) ? values[key] : defaultValue,
  }
}

async function createStrategy(
  values: Record<string, string | undefined> = { JWT_REFRESH_SECRET: REFRESH_SECRET },
) {
  const moduleRef = await Test.createTestingModule({
    providers: [
      RefreshTokenStrategy,
      {
        provide: ConfigService,
        useValue: configService(values),
      },
    ],
  }).compile()

  return moduleRef.get(RefreshTokenStrategy)
}

describe('RefreshTokenStrategy', () => {
  it('maps a valid refresh token to the member id and raw token', async () => {
    const strategy = await createStrategy()
    const token = signToken({ sub: 15 }, REFRESH_SECRET)

    await expect(authenticate(strategy, { 'x-refresh-token': token })).resolves.toEqual({
      id: 15,
      refreshToken: token,
    })
  })

  it('reads the refresh token from the x-refresh-token header', async () => {
    const strategy = await createStrategy()
    const request = {
      headers: { 'x-refresh-token': 'raw-refresh-token' },
    } as unknown as Request

    expect(strategy.validate(request, { sub: 3 })).toEqual({
      id: 3,
      refreshToken: 'raw-refresh-token',
    })
  })

  it('rejects a request without the refresh header', async () => {
    const strategy = await createStrategy()
    const token = signToken({ sub: 15 }, REFRESH_SECRET)

    await expect(authenticate(strategy, {})).rejects.toThrow('No auth token')
    await expect(authenticate(strategy, { authorization: `Bearer ${token}` })).rejects.toThrow(
      'No auth token',
    )
  })

  it('rejects a token signed with a different secret', async () => {
    const strategy = await createStrategy()
    const token = signToken({ sub: 15 }, 'other-secret')

    await expect(authenticate(strategy, { 'x-refresh-token': token })).rejects.toThrow(
      'invalid signature',
    )
  })

  it('rejects an expired refresh token', async () => {
    const strategy = await createStrategy()
    const token = signToken({ sub: 15 }, REFRESH_SECRET, -10)

    await expect(authenticate(strategy, { 'x-refresh-token': token })).rejects.toThrow(
      'jwt expired',
    )
  })

  it('refuses to start when the refresh secret is missing', async () => {
    await expect(createStrategy({})).rejects.toThrow('JwtStrategy requires a secret or key')
  })
})
