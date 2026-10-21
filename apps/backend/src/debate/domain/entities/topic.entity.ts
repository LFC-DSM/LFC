import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Debate } from './debate.entity'
import { DebateSelect } from './debate-select.entity'

@Entity('topic')
export class Topic {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number

  @Column({ length: 1000 })
  topic!: string

  @Column({ type: 'int', default: 0 })
  votes!: number

  @OneToMany(() => Debate, (debate) => debate.selectedTopic)
  debates!: Debate[]

  @OneToMany(() => DebateSelect, (ds) => ds.topic)
  debateSelects!: DebateSelect[]
}
