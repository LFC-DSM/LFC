import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateItemDto {
  @ApiProperty({ example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ example: 'A powerful laptop', required: false })
  @IsString()
  @IsOptional()
  description?: string
}
