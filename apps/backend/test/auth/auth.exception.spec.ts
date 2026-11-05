import {
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'
import { AUTH_ERRORS, AuthErrorCode } from '../../src/domain/auth/exception/auth-error-code.enum'
import { AuthException } from '../../src/domain/auth/exception/auth.exception'
import { AuthExceptionFilter } from '../../src/domain/auth/exception/auth-exception.filter'

describe('Auth exception contract', () => {
  it.each(Object.values(AuthErrorCode))('maps %s to its HTTP status and public message', (code) => {
    const error = new AuthException(code)
    expect(error.getStatus()).toBe(AUTH_ERRORS[code].status)
    expect(error.getResponse()).toEqual({
      statusCode: AUTH_ERRORS[code].status,
      code,
      message: AUTH_ERRORS[code].message,
    })
    expect(error.message).toBe(AUTH_ERRORS[code].message)
  })

  it.each([
    [
      new BadRequestException(['invalid field']),
      AuthErrorCode.INVALID_REQUEST,
      HttpStatus.BAD_REQUEST,
    ],
    [new UnauthorizedException(), AuthErrorCode.INVALID_TOKEN, HttpStatus.UNAUTHORIZED],
    [
      new AuthException(AuthErrorCode.MAIL_SEND_FAILED),
      AuthErrorCode.MAIL_SEND_FAILED,
      HttpStatus.SERVICE_UNAVAILABLE,
    ],
  ] as const)('normalizes HTTP errors without losing domain codes (%s)', (error, code, status) => {
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const host = {
      switchToHttp: () => ({ getResponse: () => response }),
    } as unknown as ArgumentsHost
    new AuthExceptionFilter().catch(error, host)
    expect(response.status).toHaveBeenCalledWith(status)
    expect(response.json).toHaveBeenCalledWith({
      statusCode: status,
      code,
      message: AUTH_ERRORS[code].message,
    })
  })
})
