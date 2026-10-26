import { Global, Module } from '@nestjs/common'
import { AccessTokenGuard } from './access-token.guard'
import { RefreshTokenGuard } from './refresh-token.guard'

@Global()
@Module({
  providers: [AccessTokenGuard, RefreshTokenGuard],
  exports: [AccessTokenGuard, RefreshTokenGuard],
})
export class SecurityModule {}
