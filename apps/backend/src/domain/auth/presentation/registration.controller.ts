import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthExceptionFilter } from '../exception/auth-exception.filter'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { EmailRequestDto, RegisterDto, VerifyEmailDto } from '../application/dtos/register.dto'
import { EmailVerificationService } from '../application/email-verification.service'
import { RegistrationService } from '../application/registration.service'

@ApiTags('auth')
@Controller('auth')
@UseFilters(AuthExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export class RegistrationController {
  constructor(
    private readonly verification: EmailVerificationService,
    private readonly registration: RegistrationService,
  ) {}

  @Post('email/send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '회원가입 인증번호 발송 (유효기간 5분)' })
  send(@Body() dto: EmailRequestDto, @Ip() ip: string) {
    return this.verification.send(dto.email, ip)
  }

  @Post('email/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '이메일 인증 및 10분 유효한 일회용 가입 토큰 발급' })
  verify(@Body() dto: VerifyEmailDto, @Ip() ip: string) {
    return this.verification.verify(dto.email, dto.code, ip)
  }

  @Post('register')
  @ApiOperation({ summary: '이메일 인증 후 회원가입 (로그인은 별도)' })
  register(@Body() dto: RegisterDto, @Ip() ip: string) {
    return this.registration.register(dto, ip)
  }
}
