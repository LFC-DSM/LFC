import { IsNumber } from 'class-validator'

export class CreateDebateDto {
  @IsNumber()
  selectedTopicId!: number
}
