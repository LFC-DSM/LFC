import { Transform } from 'class-transformer'
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class EmailRequestDto {
  @ApiProperty({ example: 'member@gmail.com' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  @MaxLength(255)
  email: string
}

export class VerifyEmailDto extends EmailRequestDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  @Matches(/^\d{6}$/)
  code: string
}

export class RegisterDto extends EmailRequestDto {
  @ApiProperty({
    description: '로그인 아이디: 영문 소문자, 숫자, 밑줄 4~20자',
    example: 'lfc_user',
  })
  @IsString()
  @Matches(/^[a-z0-9_]{4,20}$/)
  username: string

  @ApiProperty({ minLength: 8, maxLength: 72, format: 'password' })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string

  @ApiProperty({ description: '이메일 인증 API에서 발급한 일회용 토큰' })
  @IsString()
  @Matches(/^[a-f0-9]{64}$/)
  verificationToken: string
}
