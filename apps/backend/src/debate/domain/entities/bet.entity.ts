import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '../../../member/domain/entities/member.entity'
import { Debate } from './debate.entity'

@Entity('bet')
export class Bet {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ManyToOne(() => Member)
  member: Member

  @ManyToOne(() => Debate)
  debate: Debate

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number
}
