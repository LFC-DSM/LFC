import { JwtService } from '@nestjs/jwt'

export const ACCESS_SECRET = 'test-access-secret'
export const REFRESH_SECRET = 'test-refresh-secret'

const jwtService = new JwtService()

export function signToken(
  payload: { sub: number },
  secret: string,
  expiresIn: number | '15m' = '15m',
): string {
  return jwtService.sign(payload, { secret, expiresIn })
}

type Authenticatable = {
  authenticate(req: { headers: Record<string, string | undefined> }): void
  success: (user: unknown) => void
  fail: (challenge: unknown, status?: number) => void
  error: (err: Error) => void
}

export function authenticate(
  strategy: object,
  headers: Record<string, string | undefined>,
): Promise<unknown> {
  const target = strategy as Authenticatable

  return new Promise((resolve, reject) => {
    target.success = (user) => resolve(user)
    target.fail = (challenge) => reject(challenge)
    target.error = (err) => reject(err)
    target.authenticate({ headers })
  })
}
