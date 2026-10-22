import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MoneyLog } from './money-log.entity'

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  username: string

  @OneToMany(() => MoneyLog, (moneyLog) => moneyLog.member)
  moneyLogs: MoneyLog[]
}
