import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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
  id!: number

  @ManyToOne(() => Topic, (topic) => topic.debates, { nullable: false })
  selectedTopic!: Topic

  @Column({ type: 'enum', enum: DebateState, default: DebateState.VOTING })
  state!: DebateState

  @OneToMany(() => Prompt, (prompt) => prompt.debate)
  prompts!: Prompt[]

  @OneToMany(() => LlmMessage, (msg) => msg.debate)
  llmMessages!: LlmMessage[]
}
