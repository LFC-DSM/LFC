import { AuthErrorCode } from '../exception/auth-error-code.enum'
import { AuthException } from '../exception/auth.exception'
import { Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { QueryFailedError } from 'typeorm'
import { Member } from '../../member/entities/member.entity'
import { IMemberRepository, MEMBER_REPOSITORY } from '../../member/repositories/member.repository'
import { RegisterDto } from './dtos/register.dto'
import { EmailVerificationService } from './email-verification.service'

@Injectable()
export class RegistrationService {
  constructor(
    @Inject(MEMBER_REPOSITORY) private readonly members: IMemberRepository,
    private readonly verification: EmailVerificationService,
  ) {}

  async register(
    dto: RegisterDto,
    ip: string,
  ): Promise<{ id: number; username: string; email: string }> {
    await this.verification.limit('register', ip, 30)
    if (Buffer.byteLength(dto.password, 'utf8') > 72) {
      throw new AuthException(AuthErrorCode.PASSWORD_TOO_LONG)
    }
    const [emailMember, usernameMember] = await Promise.all([
      this.members.findByEmail(dto.email),
      this.members.findByUsername(dto.username),
    ])
    if (emailMember || usernameMember) throw new AuthException(AuthErrorCode.MEMBER_ALREADY_EXISTS)
    const password = await bcrypt.hash(dto.password, 12)
    await this.verification.consume(dto.email, dto.verificationToken)
    const member = Object.assign(new Member(), {
      email: dto.email,
      username: dto.username,
      password,
    })
    try {
      const saved = await this.members.save(member)
      return { id: saved.id, username: saved.username, email: saved.email }
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code?: string }).code === 'ER_DUP_ENTRY'
      ) {
        throw new AuthException(AuthErrorCode.MEMBER_ALREADY_EXISTS)
      }
      throw error
    }
  }
}
