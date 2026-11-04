import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AddressInfo } from 'node:net'
import * as bcrypt from 'bcrypt'
import { AuthController } from '../../src/domain/auth/presentation/auth.controller'
import { AuthService } from '../../src/domain/auth/application/auth.service'
import { EmailVerificationService } from '../../src/domain/auth/application/email-verification.service'
import { MEMBER_REPOSITORY } from '../../src/domain/member/repositories/member.repository'
import { GlobalJwtModule } from '../../src/global/jwt/jwt.module'
import { RedisService } from '../../src/infrastructure/redis/redis.service'

describe('Session HTTP flow with real JWT guards', () => {
  let app: INestApplication
  let url: string
  let jwt: JwtService
  const storage = new Map<string, string>()
  const member = {
    id: 7,
    username: 'lfc_user',
    email: 'user@example.com',
    password: bcrypt.hashSync('secret1234', 12),
  }
  const members = {
    findById: jest.fn().mockImplementation(async () => member),
    findByUsername: jest.fn().mockImplementation(async () => member),
  }
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          load: [
            () => ({
              JWT_ACCESS_SECRET: 'session-test-access',
              JWT_REFRESH_SECRET: 'session-test-refresh',
            }),
          ],
        }),
        GlobalJwtModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: MEMBER_REPOSITORY, useValue: members },
        {
          provide: EmailVerificationService,
          useValue: { limit: jest.fn().mockResolvedValue(undefined) },
        },
        {
          provide: RedisService,
          useValue: {
            get: async (key: string) => storage.get(key) ?? null,
            set: async (key: string, value: string) => {
              storage.set(key, value)
              return 'OK'
            },
            del: async (key: string) => Number(storage.delete(key)),
          },
        },
      ],
    }).compile()
    jwt = module.get(JwtService)
    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.listen(0, '127.0.0.1')
    url = 'http://127.0.0.1:' + (app.getHttpServer().address() as AddressInfo).port
  })
  afterAll(async () => {
    await app.close()
  })
  beforeEach(() => storage.clear())
  async function login(): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await fetch(url + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'lfc_user', password: 'secret1234' }),
    })
    expect(response.status).toBe(200)
    return response.json()
  }
  it('returns only public user fields for a real issued access token', async () => {
    const tokens = await login()
    const response = await fetch(url + '/auth/me', {
      headers: { Authorization: 'Bearer ' + tokens.accessToken },
    })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ id: 7, username: member.username, email: member.email })
  })
  it('rejects missing credentials with the auth error contract', async () => {
    const response = await fetch(url + '/auth/me')
    expect(response.status).toBe(401)
    expect(await response.json()).toMatchObject({ code: 'AUTH_INVALID_TOKEN' })
  })
  it('rejects expired access tokens', async () => {
    const expired = jwt.sign({ sub: 7 }, { secret: 'session-test-access', expiresIn: -1 })
    expect(
      (await fetch(url + '/auth/me', { headers: { Authorization: 'Bearer ' + expired } })).status,
    ).toBe(401)
  })
  it('rejects a valid JWT if its member no longer exists', async () => {
    const tokens = await login()
    members.findById.mockResolvedValueOnce(null)
    const response = await fetch(url + '/auth/me', {
      headers: { Authorization: 'Bearer ' + tokens.accessToken },
    })
    expect(response.status).toBe(401)
    expect(await response.json()).toMatchObject({ code: 'AUTH_INVALID_TOKEN' })
  })
  it('refreshes with x-refresh-token and authenticates the next user lookup', async () => {
    const tokens = await login()
    const response = await fetch(url + '/auth/refresh', {
      method: 'POST',
      headers: { 'x-refresh-token': tokens.refreshToken },
    })
    expect(response.status).toBe(200)
    const next = (await response.json()) as { accessToken: string; refreshToken: string }
    expect(storage.get('refresh_token:7')).toBe(next.refreshToken)
    expect(
      (await fetch(url + '/auth/me', { headers: { Authorization: 'Bearer ' + next.accessToken } }))
        .status,
    ).toBe(200)
  })
  it('logs out with HTTP 204 and prevents subsequent refresh', async () => {
    const tokens = await login()
    const response = await fetch(url + '/auth/logout', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + tokens.accessToken },
    })
    expect(response.status).toBe(204)
    expect(await response.text()).toBe('')
    expect(storage.has('refresh_token:7')).toBe(false)
    const refresh = await fetch(url + '/auth/refresh', {
      method: 'POST',
      headers: { 'x-refresh-token': tokens.refreshToken },
    })
    expect(refresh.status).toBe(401)
    expect(await refresh.json()).toMatchObject({ code: 'AUTH_INVALID_REFRESH_TOKEN' })
  })
})
