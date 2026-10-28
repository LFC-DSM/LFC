import { UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../../src/domain/auth/application/auth.service'
import { JwtTokenService } from '../../src/global/jwt/jwt-token.service'
import { RedisService } from '../../src/infrastructure/redis/redis.service'

describe('AuthService', () => {
  const tokens = { accessToken: 'access', refreshToken: 'refresh' }
  const memberId = 7

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

    const service = new AuthService(
      jwtTokenService as unknown as JwtTokenService,
      redisService as unknown as RedisService,
    )

    return { service, jwtTokenService, redisService }
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
      UnauthorizedException,
    )
    expect(jwtTokenService.issue).not.toHaveBeenCalled()
  })
})
