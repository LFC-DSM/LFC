import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '../../../member/domain/entities/member.entity'
import { Item } from './item.entity'

@Entity('member_item')
export class MemberItem {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number

  @ManyToOne(() => Member, { nullable: false })
  member!: Member

  @ManyToOne(() => Item, (item) => item.memberItems, { nullable: false })
  item!: Item

  @Column({ type: 'int', default: 1 })
  quantity!: number
}
