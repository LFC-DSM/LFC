import { Module } from '@nestjs/common'
import { RedisModule } from '../../infrastructure/redis/redis.module'
import { AuthService } from './application/auth.service'
import { AuthController } from './presentation/auth.controller'

@Module({
  imports: [RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
