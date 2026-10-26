import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET', ''),
      passReqToCallback: true,
    } as StrategyOptionsWithRequest)
  }

  validate(req: Request, payload: { sub: number }) {
    const refreshToken = req.headers['x-refresh-token'] as string
    return { id: payload.sub, refreshToken }
  }
}
