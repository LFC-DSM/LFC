import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import type { Response } from 'express'
import { AuthErrorCode } from './auth-error-code.enum'
import { AuthException } from './auth.exception'

// Scoped to auth controllers, including errors from validation pipes and token guards.
@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>()
    let error = exception
    if (!(exception instanceof AuthException)) {
      if (exception.getStatus() === HttpStatus.BAD_REQUEST)
        error = new AuthException(AuthErrorCode.INVALID_REQUEST)
      else if (exception.getStatus() === HttpStatus.UNAUTHORIZED)
        error = new AuthException(AuthErrorCode.INVALID_TOKEN)
    }
    response.status(error.getStatus()).json(error.getResponse())
  }
}
