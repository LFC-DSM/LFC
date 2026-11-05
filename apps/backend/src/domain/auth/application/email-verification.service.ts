import { AuthErrorCode } from '../exception/auth-error-code.enum'
import { AuthException } from '../exception/auth.exception'
import { Injectable } from '@nestjs/common'
import { createHash, randomBytes, randomInt } from 'node:crypto'
import { RedisService } from '../../../infrastructure/redis/redis.service'
import { SignupMailService } from '../infrastructure/signup-mail.service'

export function digest(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

const LIMIT = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return count
`
const VERIFY = `
local value = redis.call('GET', KEYS[1])
if not value then return 0 end
local challenge = cjson.decode(value)
if challenge.hash ~= ARGV[1] then
  challenge.attempts = challenge.attempts + 1
  if challenge.attempts >= 5 then redis.call('DEL', KEYS[1])
  else redis.call('SET', KEYS[1], cjson.encode(challenge), 'KEEPTTL') end
  return 0
end
redis.call('SET', KEYS[2], ARGV[2], 'EX', 600)
redis.call('DEL', KEYS[1])
return 1
`
const CONSUME = `
if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 0 end
redis.call('DEL', KEYS[1])
return 1
`

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly redis: RedisService,
    private readonly mail: SignupMailService,
  ) {}

  async limit(action: string, ip: string, maximum: number): Promise<void> {
    const count = Number(
      await this.redis.eval(LIMIT, ['signup:limit:' + action + ':' + digest(ip)], ['3600']),
    )
    if (count > maximum) throw new AuthException(AuthErrorCode.RATE_LIMIT_EXCEEDED)
  }

  async send(email: string, ip: string): Promise<{ expiresIn: number; resendAfter: number }> {
    await this.limit('send', ip, 20)
    const key = 'signup:email:' + digest(email)
    if (!(await this.redis.setIfAbsent(key + ':cooldown', '1', 60))) {
      throw new AuthException(AuthErrorCode.EMAIL_RESEND_TOO_SOON)
    }
    const code = randomInt(0, 1000000).toString().padStart(6, '0')
    await this.redis.set(
      key,
      JSON.stringify({ hash: digest(email + ':' + code), attempts: 0 }),
      300,
    )
    try {
      await this.mail.sendCode(email, code)
    } catch (error) {
      await this.redis.del(key)
      throw error
    }
    return { expiresIn: 300, resendAfter: 60 }
  }

  async verify(
    email: string,
    code: string,
    ip: string,
  ): Promise<{ verificationToken: string; expiresIn: number }> {
    await this.limit('verify', ip, 100)
    const verificationToken = randomBytes(32).toString('hex')
    const result = await this.redis.eval(
      VERIFY,
      ['signup:email:' + digest(email), 'signup:proof:' + digest(verificationToken)],
      [digest(email + ':' + code), email],
    )
    if (Number(result) !== 1) throw new AuthException(AuthErrorCode.INVALID_EMAIL_CODE)
    return { verificationToken, expiresIn: 600 }
  }

  async consume(email: string, token: string): Promise<void> {
    const result = await this.redis.eval(CONSUME, ['signup:proof:' + digest(token)], [email])
    if (Number(result) !== 1) throw new AuthException(AuthErrorCode.INVALID_EMAIL_VERIFICATION)
  }
}
