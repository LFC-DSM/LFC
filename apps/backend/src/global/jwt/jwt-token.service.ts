import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

export interface IssuedTokens {
  accessToken: string
  refreshToken: string
}

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  issue(memberId: number): IssuedTokens {
    const payload = { sub: memberId }

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.secret('JWT_ACCESS_SECRET'),
        expiresIn: this.accessTtlSeconds(),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.secret('JWT_REFRESH_SECRET'),
        expiresIn: this.refreshTtlSeconds(),
      }),
    }
  }

  refreshTtlSeconds(): number {
    return expiresInToSeconds(
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
      7 * 24 * 60 * 60,
    )
  }

  private accessTtlSeconds(): number {
    return expiresInToSeconds(
      this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '15m'),
      15 * 60,
    )
  }

  private secret(key: string): string {
    const value = this.configService.get<string>(key)
    if (!value) {
      throw new InternalServerErrorException(`${key} is not configured`)
    }
    return value
  }
}

function expiresInToSeconds(value: string, fallback: number): number {
  const match = /^(\d+)([smhd])$/.exec(value)
  if (!match) {
    return fallback
  }

  const amount = Number(match[1])
  const unit = match[2] as 's' | 'm' | 'h' | 'd'
  const factor = { s: 1, m: 60, h: 3600, d: 86400 }[unit]
  return amount * factor
}
