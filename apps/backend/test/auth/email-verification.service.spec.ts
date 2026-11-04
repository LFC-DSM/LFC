import { HttpException, ServiceUnavailableException } from '@nestjs/common'
import { AuthException } from '../../src/domain/auth/exception/auth.exception'
import {
  EmailVerificationService,
  digest,
} from '../../src/domain/auth/application/email-verification.service'
import { RedisService } from '../../src/infrastructure/redis/redis.service'
import { SignupMailService } from '../../src/domain/auth/infrastructure/signup-mail.service'

describe('EmailVerificationService', () => {
  function setup() {
    const redis = {
      eval: jest.fn().mockResolvedValue(1),
      setIfAbsent: jest.fn().mockResolvedValue('OK'),
      set: jest.fn(),
      del: jest.fn(),
    }
    const mail = { sendCode: jest.fn() }
    return {
      redis,
      mail,
      service: new EmailVerificationService(
        redis as unknown as RedisService,
        mail as unknown as SignupMailService,
      ),
    }
  }
  it('sends six digits and stores only a digest with a five minute TTL', async () => {
    const { service, redis, mail } = setup()
    await expect(service.send('user@gmail.com', 'ip')).resolves.toEqual({
      expiresIn: 300,
      resendAfter: 60,
    })
    const code = mail.sendCode.mock.calls[0][1]
    expect(code).toMatch(/^\d{6}$/)
    const [key, payload, ttl] = redis.set.mock.calls[0]
    expect(key).toBe('signup:email:' + digest('user@gmail.com'))
    expect(JSON.parse(payload)).toEqual({ hash: digest('user@gmail.com:' + code), attempts: 0 })
    expect(ttl).toBe(300)
  })
  it('enforces the resend cooldown', async () => {
    const { service, redis, mail } = setup()
    redis.setIfAbsent.mockResolvedValue(null)
    await expect(service.send('user@gmail.com', 'ip')).rejects.toBeInstanceOf(HttpException)
    expect(mail.sendCode).not.toHaveBeenCalled()
  })
  it('invalidates the challenge if SMTP fails', async () => {
    const { service, redis, mail } = setup()
    mail.sendCode.mockRejectedValue(new ServiceUnavailableException())
    await expect(service.send('user@gmail.com', 'ip')).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    )
    expect(redis.del).toHaveBeenCalledWith('signup:email:' + digest('user@gmail.com'))
  })
  it('enforces per-IP request limits', async () => {
    const { service, redis, mail } = setup()
    redis.eval.mockResolvedValue(21)
    await expect(service.send('user@gmail.com', 'ip')).rejects.toMatchObject({ status: 429 })
    expect(mail.sendCode).not.toHaveBeenCalled()
  })
  it('returns a random proof only after atomic verification succeeds', async () => {
    const { service, redis } = setup()
    const result = await service.verify('user@gmail.com', '123456', 'ip')
    expect(result.verificationToken).toMatch(/^[a-f0-9]{64}$/)
    expect(result.expiresIn).toBe(600)
    expect(redis.eval.mock.calls[1][1]).toEqual([
      'signup:email:' + digest('user@gmail.com'),
      'signup:proof:' + digest(result.verificationToken),
    ])
  })
  it('rejects wrong, expired or exhausted challenges', async () => {
    const { service, redis } = setup()
    redis.eval.mockResolvedValueOnce(1).mockResolvedValueOnce(0)
    await expect(service.verify('user@gmail.com', '123456', 'ip')).rejects.toBeInstanceOf(
      AuthException,
    )
  })
  it('rejects expired, reused, or differently bound signup proofs', async () => {
    const { service, redis } = setup()
    redis.eval.mockResolvedValue(0)
    await expect(service.consume('user@gmail.com', 'token')).rejects.toBeInstanceOf(AuthException)
    expect(redis.eval.mock.calls[0][2]).toEqual(['user@gmail.com'])
  })
})
