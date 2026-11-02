import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { LlmMessage } from '../../debate/entities/llm-message.entity'
import { Member } from '../../member/entities/member.entity'
import { Item } from './item.entity'

@Entity('emoji')
export class Emoji {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ManyToOne(() => Member, { nullable: false })
  member: Member

  @ManyToOne(() => Item, (item) => item.emojis)
  item: Item

  @ManyToOne(() => LlmMessage, { nullable: false })
  message: LlmMessage
}
