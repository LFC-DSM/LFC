import { AuthErrorCode } from '../exception/auth-error-code.enum'
import { AuthException } from '../exception/auth.exception'
import * as bcrypt from 'bcrypt'
import { IMemberRepository, MEMBER_REPOSITORY } from '../../member/repositories/member.repository'
import { EmailVerificationService } from './email-verification.service'
import { LoginDto } from './dtos/login.dto'
import { Inject, Injectable } from '@nestjs/common'
import { JwtTokenService } from '../../../global/jwt/jwt-token.service'
import { RedisService } from '../../../infrastructure/redis/redis.service'
import { TokenResponseDto } from './dtos/token-response.dto'

const DUMMY_PASSWORD_HASH = '$2b$12$VbeJfZW2f1vg0YkDVOWSLO1axjHWWNclbB.7zuUP4bHTXLXEGqh9q'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly redisService: RedisService,
    @Inject(MEMBER_REPOSITORY) private readonly members: IMemberRepository,
    private readonly verification: EmailVerificationService,
  ) {}

  async login(dto: LoginDto, ip: string): Promise<TokenResponseDto> {
    await this.verification.limit('login', ip, 60)
    if (Buffer.byteLength(dto.password, 'utf8') > 72) {
      throw new AuthException(AuthErrorCode.INVALID_CREDENTIALS)
    }
    const member = await this.members.findByUsername(dto.username)
    const validPassword = await bcrypt.compare(
      dto.password,
      member?.password ?? DUMMY_PASSWORD_HASH,
    )
    if (!member || !validPassword) {
      throw new AuthException(AuthErrorCode.INVALID_CREDENTIALS)
    }
    return this.issueAndStore(member.id)
  }

  async currentUser(memberId: number): Promise<{ id: number; username: string; email: string }> {
    const member = await this.members.findById(memberId)
    if (!member) throw new AuthException(AuthErrorCode.INVALID_TOKEN)
    return { id: member.id, username: member.username, email: member.email }
  }

  async refresh(memberId: number, refreshToken: string): Promise<TokenResponseDto> {
    const stored = await this.redisService.get(refreshKey(memberId))
    if (!stored || stored !== refreshToken) {
      throw new AuthException(AuthErrorCode.INVALID_REFRESH_TOKEN)
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
