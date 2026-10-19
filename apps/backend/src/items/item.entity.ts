import { ApiProperty } from '@nestjs/swagger'

export class Item {
  @ApiProperty({ example: 1 })
  id!: number

  @ApiProperty({ example: 'Laptop' })
  name!: string

  @ApiProperty({ example: 'A powerful laptop', required: false })
  description?: string
}
