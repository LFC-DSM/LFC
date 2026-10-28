import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppConfigModule } from './global/config/config.module'
import { GlobalJwtModule } from './global/jwt/jwt.module'
import { SecurityModule } from './global/security/security.module'
import { DatabaseModule } from './infrastructure/database/database.module'
import { RedisModule } from './infrastructure/redis/redis.module'

@Module({
  imports: [AppConfigModule, DatabaseModule, RedisModule, GlobalJwtModule, SecurityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
