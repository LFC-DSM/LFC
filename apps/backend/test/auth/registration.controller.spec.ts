import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AddressInfo } from 'node:net'
import { RegistrationController } from '../../src/domain/auth/presentation/registration.controller'
import { RegistrationService } from '../../src/domain/auth/application/registration.service'
import { EmailVerificationService } from '../../src/domain/auth/application/email-verification.service'

describe('Registration HTTP validation', () => {
  let app: INestApplication
  let url: string
  const verification = {
    send: jest.fn().mockResolvedValue({ expiresIn: 300, resendAfter: 60 }),
    verify: jest.fn().mockResolvedValue({ verificationToken: 'a'.repeat(64), expiresIn: 600 }),
  }
  const registration = {
    register: jest.fn().mockResolvedValue({ id: 1, username: 'lfc_user', email: 'user@gmail.com' }),
  }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [RegistrationController],
      providers: [
        { provide: RegistrationService, useValue: registration },
        { provide: EmailVerificationService, useValue: verification },
      ],
    }).compile()
    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.listen(0, '127.0.0.1')
    url = 'http://127.0.0.1:' + (app.getHttpServer().address() as AddressInfo).port
  })
  afterAll(async () => {
    await app.close()
  })
  function post(route: string, body: unknown) {
    return fetch(url + '/auth/' + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  it('normalizes email before calling the service', async () => {
    const response = await post('email/send', { email: ' User@Gmail.com ' })
    expect(response.status).toBe(200)
    expect(verification.send).toHaveBeenCalledWith('user@gmail.com', '127.0.0.1')
  })
  it.each([{ email: 'bad' }, { email: 123 }, {}])('rejects malformed email %j', async (body) => {
    expect((await post('email/send', body)).status).toBe(400)
    expect(verification.send).not.toHaveBeenCalled()
  })
  it('requires a six digit string for email verification', async () => {
    expect((await post('email/verify', { email: 'user@gmail.com', code: 123456 })).status).toBe(400)
    expect(verification.verify).not.toHaveBeenCalled()
  })
  it('rejects invalid registration fields without invoking the service', async () => {
    expect(
      (
        await post('register', {
          email: 'user@gmail.com',
          username: 'x',
          password: 'short',
          verificationToken: 'fake',
        })
      ).status,
    ).toBe(400)
    expect(registration.register).not.toHaveBeenCalled()
  })
  it('creates a member with HTTP 201', async () => {
    const response = await post('register', {
      email: 'user@gmail.com',
      username: 'lfc_user',
      password: 'secret1234',
      verificationToken: 'a'.repeat(64),
    })
    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({ id: 1, username: 'lfc_user', email: 'user@gmail.com' })
  })
})
