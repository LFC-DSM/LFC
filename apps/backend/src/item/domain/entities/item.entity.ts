import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MemberItem } from './member-item.entity'
import { Emoji } from './emoji.entity'

export enum ItemType {
  SUPER_CHAT = 'SUPER_CHAT',
  CHAT_BACKGROUND = 'CHAT_BACKGROUND',
  EMOJI = 'EMOJI',
}

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number

  @Column({ type: 'enum', enum: ItemType })
  type!: ItemType

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number

  @Column({ length: 128 })
  name!: string

  @OneToMany(() => MemberItem, (mi) => mi.item)
  memberItems!: MemberItem[]

  @OneToMany(() => Emoji, (emoji) => emoji.item)
  emojis!: Emoji[]
}
