import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Debate } from './debate.entity'

export enum LlmMessageType {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
}

@Entity('llm_message')
export class LlmMessage {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number

  @ManyToOne(() => Debate, (debate) => debate.llmMessages, { nullable: false })
  debate!: Debate

  @Column({ type: 'int' })
  messageIndex!: number

  @Column({ type: 'enum', enum: LlmMessageType })
  type!: LlmMessageType
}
