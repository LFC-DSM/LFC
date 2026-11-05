import { HttpException } from '@nestjs/common'
import { AUTH_ERRORS, AuthErrorCode } from './auth-error-code.enum'

export class AuthException extends HttpException {
  constructor(readonly code: AuthErrorCode) {
    const { status, message } = AUTH_ERRORS[code]
    super({ statusCode: status, code, message }, status)
  }
}
