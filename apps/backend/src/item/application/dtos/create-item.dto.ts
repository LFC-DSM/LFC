import { IsEnum, IsNumber, IsString, MaxLength } from 'class-validator'
import { ItemType } from '../../domain/entities/item.entity'

export class CreateItemDto {
  @IsEnum(ItemType)
  type!: ItemType

  @IsNumber()
  price!: number

  @IsString()
  @MaxLength(128)
  name!: string
}
