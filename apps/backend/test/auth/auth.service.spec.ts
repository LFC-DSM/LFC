import { AuthException } from '../../src/domain/auth/exception/auth.exception'
import * as bcrypt from 'bcrypt'
import { AuthService } from '../../src/domain/auth/application/auth.service'
import { JwtTokenService } from '../../src/global/jwt/jwt-token.service'
import { RedisService } from '../../src/infrastructure/redis/redis.service'
import { EmailVerificationService } from '../../src/domain/auth/application/email-verification.service'

describe('AuthService', () => {
  const tokens = { accessToken: 'access', refreshToken: 'refresh' }
  const memberId = 7
  const passwordHash = bcrypt.hashSync('secret1234', 12)

  function createService(stored: string | null = tokens.refreshToken) {
    const jwtTokenService = {
      issue: jest.fn().mockReturnValue(tokens),
      refreshTtlSeconds: jest.fn().mockReturnValue(60),
    }
    const redisService = {
      set: jest.fn().mockResolvedValue('OK'),
      get: jest.fn().mockResolvedValue(stored),
      del: jest.fn().mockResolvedValue(1),
    }
    const members = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findByUsername: jest
        .fn()
        .mockResolvedValue({ id: memberId, username: 'lfc_user', password: passwordHash }),
      save: jest.fn(),
      delete: jest.fn(),
    }
    const verification = { limit: jest.fn().mockResolvedValue(undefined) }
    const service = new AuthService(
      jwtTokenService as unknown as JwtTokenService,
      redisService as unknown as RedisService,
      members,
      verification as unknown as EmailVerificationService,
    )
    return { service, jwtTokenService, redisService, members, verification }
  }

  it('reissues tokens when the stored refresh token matches', async () => {
    const { service, jwtTokenService, redisService } = createService()
    await expect(service.refresh(memberId, tokens.refreshToken)).resolves.toEqual(tokens)
    expect(jwtTokenService.issue).toHaveBeenCalledWith(memberId)
    expect(redisService.set).toHaveBeenCalledWith('refresh_token:7', tokens.refreshToken, 60)
  })
  it('rejects a refresh token that is not the stored one', async () => {
    const { service, jwtTokenService } = createService('other-token')
    await expect(service.refresh(memberId, tokens.refreshToken)).rejects.toBeInstanceOf(
      AuthException,
    )
    expect(jwtTokenService.issue).not.toHaveBeenCalled()
  })
  it('verifies the password, issues tokens, and stores the refresh token', async () => {
    const { service, members, verification, redisService } = createService()
    await expect(
      service.login({ username: 'lfc_user', password: 'secret1234' }, 'ip'),
    ).resolves.toEqual(tokens)
    expect(members.findByUsername).toHaveBeenCalledWith('lfc_user')
    expect(verification.limit).toHaveBeenCalledWith('login', 'ip', 60)
    expect(redisService.set).toHaveBeenCalledWith('refresh_token:7', 'refresh', 60)
  })
  it('does not issue tokens for a wrong password', async () => {
    const { service, jwtTokenService, redisService } = createService()
    await expect(
      service.login({ username: 'lfc_user', password: 'wrong1234' }, 'ip'),
    ).rejects.toMatchObject({ status: 401, message: '아이디 또는 비밀번호가 올바르지 않습니다.' })
    expect(jwtTokenService.issue).not.toHaveBeenCalled()
    expect(redisService.set).not.toHaveBeenCalled()
  })
  it('uses the same error for an unknown username', async () => {
    const { service, members, jwtTokenService } = createService()
    members.findByUsername.mockResolvedValue(null)
    await expect(
      service.login({ username: 'unknown_user', password: 'secret1234' }, 'ip'),
    ).rejects.toMatchObject({ status: 401, message: '아이디 또는 비밀번호가 올바르지 않습니다.' })
    expect(jwtTokenService.issue).not.toHaveBeenCalled()
  })
  it('rejects oversized multibyte passwords without issuing tokens', async () => {
    const { service, members, jwtTokenService } = createService()
    await expect(
      service.login({ username: 'lfc_user', password: '가'.repeat(25) }, 'ip'),
    ).rejects.toBeInstanceOf(AuthException)
    expect(members.findByUsername).not.toHaveBeenCalled()
    expect(jwtTokenService.issue).not.toHaveBeenCalled()
  })
  it('stops credential checks when the rate limit is reached', async () => {
    const { service, members, verification } = createService()
    verification.limit.mockRejectedValue(new Error('limited'))
    await expect(
      service.login({ username: 'lfc_user', password: 'secret1234' }, 'ip'),
    ).rejects.toThrow('limited')
    expect(members.findByUsername).not.toHaveBeenCalled()
  })
})
