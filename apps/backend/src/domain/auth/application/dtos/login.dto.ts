import { IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'lfc_user', description: '회원가입 시 설정한 아이디' })
  @IsString()
  @Matches(/^[a-z0-9_]{4,20}$/)
  username: string

  @ApiProperty({ format: 'password' })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string
}
