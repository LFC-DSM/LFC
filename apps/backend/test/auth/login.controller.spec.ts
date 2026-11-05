import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AuthException } from '../../src/domain/auth/exception/auth.exception'
import { AuthErrorCode } from '../../src/domain/auth/exception/auth-error-code.enum'
import { Test } from '@nestjs/testing'
import { AddressInfo } from 'node:net'
import { AuthController } from '../../src/domain/auth/presentation/auth.controller'
import { AuthService } from '../../src/domain/auth/application/auth.service'

describe('Login HTTP API', () => {
  let app: INestApplication
  let url: string
  const auth = { login: jest.fn() }
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: auth }],
    }).compile()
    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.listen(0, '127.0.0.1')
    url = 'http://127.0.0.1:' + (app.getHttpServer().address() as AddressInfo).port
  })
  afterAll(async () => {
    await app.close()
  })
  function post(body: unknown) {
    return fetch(url + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }
  it('returns HTTP 200 and tokens after successful login', async () => {
    auth.login.mockResolvedValueOnce({ accessToken: 'access', refreshToken: 'refresh' })
    const body = { username: 'lfc_user', password: 'secret1234' }
    const response = await post(body)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ accessToken: 'access', refreshToken: 'refresh' })
    expect(auth.login).toHaveBeenCalledWith(body, '127.0.0.1')
  })
  it.each([
    {},
    { username: 'x', password: 'secret1234' },
    { username: 'lfc_user', password: 'short' },
    { username: 123, password: 'secret1234' },
  ])('rejects malformed credentials %j', async (body) => {
    const response = await post(body)
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({
      statusCode: 400,
      code: AuthErrorCode.INVALID_REQUEST,
    })
    expect(auth.login).not.toHaveBeenCalled()
  })
  it('returns HTTP 401 when credentials are rejected', async () => {
    auth.login.mockRejectedValueOnce(new AuthException(AuthErrorCode.INVALID_CREDENTIALS))
    const response = await post({ username: 'lfc_user', password: 'wrong1234' })
    expect(response.status).toBe(401)
    expect(await response.json()).toMatchObject({
      statusCode: 401,
      code: AuthErrorCode.INVALID_CREDENTIALS,
      message: '아이디 또는 비밀번호가 올바르지 않습니다.',
    })
  })
})
