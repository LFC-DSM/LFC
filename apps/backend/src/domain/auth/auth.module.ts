import { MemberModule } from '../member/member.module'
import { RegistrationService } from './application/registration.service'
import { EmailVerificationService } from './application/email-verification.service'
import { SignupMailService } from './infrastructure/signup-mail.service'
import { RegistrationController } from './presentation/registration.controller'
import { Module } from '@nestjs/common'
import { RedisModule } from '../../infrastructure/redis/redis.module'
import { AuthService } from './application/auth.service'
import { AuthController } from './presentation/auth.controller'

@Module({
  imports: [RedisModule, MemberModule],
  controllers: [AuthController, RegistrationController],
  providers: [AuthService, RegistrationService, EmailVerificationService, SignupMailService],
})
export class AuthModule {}
