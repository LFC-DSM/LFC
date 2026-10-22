import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '../../../member/domain/entities/member.entity'
import { Item } from './item.entity'
import { LlmMessage } from '../../../debate/domain/entities/llm-message.entity'

@Entity('emoji')
export class Emoji {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number

  @ManyToOne(() => Member, { nullable: false })
  member!: Member

  @ManyToOne(() => Item, (item) => item.emojis, { nullable: false })
  item!: Item

  @ManyToOne(() => LlmMessage, { nullable: false })
  message!: LlmMessage
}
