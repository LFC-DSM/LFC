import { AuthErrorCode } from '../exception/auth-error-code.enum'
import { AuthException } from '../exception/auth.exception'
import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'

@Injectable()
export class SignupMailService implements OnModuleDestroy {
  private transport?: nodemailer.Transporter

  constructor(private readonly config: ConfigService) {}

  async sendCode(email: string, code: string): Promise<void> {
    const user = this.config.get<string>('SMTP_USER')
    const pass = this.config.get<string>('SMTP_PASSWORD')
    if (!user || !pass) {
      throw new AuthException(AuthErrorCode.MAIL_NOT_CONFIGURED)
    }
    this.transport ??= nodemailer.createTransport({
      host: this.config.get<string>('SMTP_HOST', 'smtp.gmail.com'),
      port: Number(this.config.get('SMTP_PORT', 465)),
      secure: this.config.get<string>('SMTP_SECURE', 'true') === 'true',
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })
    try {
      await this.transport.sendMail({
        from: this.config.get<string>('SMTP_FROM', user),
        to: email,
        subject: '[LFC] 회원가입 이메일 인증번호',
        text:
          'LFC 인증번호: ' +
          code +
          '\n5분 안에 입력해 주세요. 본인이 요청하지 않았다면 무시해 주세요.',
      })
    } catch {
      throw new AuthException(AuthErrorCode.MAIL_SEND_FAILED)
    }
  }

  onModuleDestroy(): void {
    this.transport?.close()
  }
}
