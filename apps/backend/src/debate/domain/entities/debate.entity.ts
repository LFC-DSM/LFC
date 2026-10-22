import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Topic } from './topic.entity'
import { Prompt } from './prompt.entity'
import { LlmMessage } from './llm-message.entity'

export enum DebateState {
  VOTING = 'VOTING',
  DEBATING = 'DEBATING',
  DONE = 'DONE',
}

@Entity('debate')
export class Debate {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ type: 'enum', enum: DebateState, default: DebateState.VOTING })
  state: DebateState

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Topic, { nullable: true, eager: false })
  selectedTopic: Topic | null

  @OneToMany(() => Topic, (topic) => topic.debate)
  topics: Topic[]

  @OneToMany(() => Prompt, (prompt) => prompt.debate)
  prompts: Prompt[]

  @OneToMany(() => LlmMessage, (msg) => msg.debate)
  llmMessages: LlmMessage[]
}
