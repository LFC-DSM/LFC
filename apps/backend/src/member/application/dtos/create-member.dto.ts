import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateMemberDto {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(8)
  password!: string

  @IsString()
  username!: string
}
