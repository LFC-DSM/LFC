import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppConfigModule } from './global/config/config.module'
import { GlobalJwtModule } from './global/jwt/jwt.module'
import { SecurityModule } from './global/security/security.module'
import { DatabaseModule } from './infrastructure/database/database.module'
import { MemberModule } from './domain/member/member.module'
import { DebateModule } from './domain/debate/debate.module'
import { ItemModule } from './domain/item/item.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    GlobalJwtModule,
    SecurityModule,
    MemberModule,
    DebateModule,
    ItemModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
