import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtTokenService } from '../../../global/jwt/jwt-token.service'
import { RedisService } from '../../../infrastructure/redis/redis.service'
import { TokenResponseDto } from './dtos/token-response.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly redisService: RedisService,
  ) {}

  // todo: register 회원 생성 후 토큰 발급. MemberService.register 필요
  // todo: login 이메일·비밀번호 확인 후 토큰 발급. MemberService.findByEmail 필요

  async refresh(memberId: number, refreshToken: string): Promise<TokenResponseDto> {
    const stored = await this.redisService.get(refreshKey(memberId))
    if (!stored || stored !== refreshToken) {
      throw new UnauthorizedException('유효하지 않은 Refresh Token입니다.')
    }
    return this.issueAndStore(memberId)
  }

  async logout(memberId: number): Promise<void> {
    await this.redisService.del(refreshKey(memberId))
  }

  private async issueAndStore(memberId: number): Promise<TokenResponseDto> {
    const tokens = this.jwtTokenService.issue(memberId)
    await this.redisService.set(
      refreshKey(memberId),
      tokens.refreshToken,
      this.jwtTokenService.refreshTtlSeconds(),
    )
    return tokens
  }
}

function refreshKey(memberId: number): string {
  return `refresh_token:${memberId}`
}
