import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from './member.entity'

export enum MoneyLogType {
  TOKEN = 'TOKEN',
  CREDIT = 'CREDIT',
}

@Entity('money_log')
export class MoneyLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number

  @ManyToOne(() => Member, (member) => member.moneyLogs, { nullable: false })
  member!: Member

  @Column({ type: 'enum', enum: MoneyLogType })
  type!: MoneyLogType

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number
}
