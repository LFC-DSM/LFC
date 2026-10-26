import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AccessTokenStrategy } from './access-token.strategy'
import { RefreshTokenStrategy } from './refresh-token.strategy'

@Global()
@Module({
  imports: [PassportModule, JwtModule],
  providers: [AccessTokenStrategy, RefreshTokenStrategy],
  exports: [JwtModule, PassportModule],
})
export class GlobalJwtModule {}
