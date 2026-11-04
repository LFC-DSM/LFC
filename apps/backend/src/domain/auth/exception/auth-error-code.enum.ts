import { HttpStatus } from '@nestjs/common'

export enum AuthErrorCode {
  INVALID_REQUEST = 'AUTH_INVALID_REQUEST',
  INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS',
  INVALID_TOKEN = 'AUTH_INVALID_TOKEN',
  INVALID_REFRESH_TOKEN = 'AUTH_INVALID_REFRESH_TOKEN',
  PASSWORD_TOO_LONG = 'AUTH_PASSWORD_TOO_LONG',
  MEMBER_ALREADY_EXISTS = 'AUTH_MEMBER_ALREADY_EXISTS',
  RATE_LIMIT_EXCEEDED = 'AUTH_RATE_LIMIT_EXCEEDED',
  EMAIL_RESEND_TOO_SOON = 'AUTH_EMAIL_RESEND_TOO_SOON',
  INVALID_EMAIL_CODE = 'AUTH_INVALID_EMAIL_CODE',
  INVALID_EMAIL_VERIFICATION = 'AUTH_INVALID_EMAIL_VERIFICATION',
  MAIL_NOT_CONFIGURED = 'AUTH_MAIL_NOT_CONFIGURED',
  MAIL_SEND_FAILED = 'AUTH_MAIL_SEND_FAILED',
}

export const AUTH_ERRORS: Readonly<Record<AuthErrorCode, { status: HttpStatus; message: string }>> =
  {
    [AuthErrorCode.INVALID_REQUEST]: {
      status: HttpStatus.BAD_REQUEST,
      message: '입력값의 형식이 올바르지 않습니다.',
    },
    [AuthErrorCode.INVALID_CREDENTIALS]: {
      status: HttpStatus.UNAUTHORIZED,
      message: '아이디 또는 비밀번호가 올바르지 않습니다.',
    },
    [AuthErrorCode.INVALID_TOKEN]: {
      status: HttpStatus.UNAUTHORIZED,
      message: '유효하지 않거나 만료된 인증 토큰입니다.',
    },
    [AuthErrorCode.INVALID_REFRESH_TOKEN]: {
      status: HttpStatus.UNAUTHORIZED,
      message: '유효하지 않은 Refresh Token입니다.',
    },
    [AuthErrorCode.PASSWORD_TOO_LONG]: {
      status: HttpStatus.BAD_REQUEST,
      message: '비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.',
    },
    [AuthErrorCode.MEMBER_ALREADY_EXISTS]: {
      status: HttpStatus.CONFLICT,
      message: '이미 사용 중인 이메일 또는 아이디입니다.',
    },
    [AuthErrorCode.RATE_LIMIT_EXCEEDED]: {
      status: HttpStatus.TOO_MANY_REQUESTS,
      message: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
    },
    [AuthErrorCode.EMAIL_RESEND_TOO_SOON]: {
      status: HttpStatus.TOO_MANY_REQUESTS,
      message: '인증번호는 60초 후 재발송할 수 있습니다.',
    },
    [AuthErrorCode.INVALID_EMAIL_CODE]: {
      status: HttpStatus.BAD_REQUEST,
      message: '인증번호가 틀렸거나 만료되었습니다. 5회 실패 시 재발송해 주세요.',
    },
    [AuthErrorCode.INVALID_EMAIL_VERIFICATION]: {
      status: HttpStatus.BAD_REQUEST,
      message: '이메일 인증이 필요하거나 인증이 만료되었습니다.',
    },
    [AuthErrorCode.MAIL_NOT_CONFIGURED]: {
      status: HttpStatus.SERVICE_UNAVAILABLE,
      message: '메일 발송 계정이 설정되지 않았습니다.',
    },
    [AuthErrorCode.MAIL_SEND_FAILED]: {
      status: HttpStatus.SERVICE_UNAVAILABLE,
      message: '인증 메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    },
  }
