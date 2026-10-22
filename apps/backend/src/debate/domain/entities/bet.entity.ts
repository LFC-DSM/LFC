import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '../../../member/domain/entities/member.entity'
import { Debate } from './debate.entity'

@Entity('bet')
export class Bet {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number

  @ManyToOne(() => Member, { nullable: false })
  member!: Member

  @ManyToOne(() => Debate, { nullable: false })
  debate!: Debate

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number
}
