import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Debate } from './debate.entity'
import { Comment } from './comment.entity'

export enum PromptType {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
}

@Entity('prompt')
export class Prompt {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number

  @ManyToOne(() => Debate, (debate) => debate.prompts, { nullable: false })
  debate!: Debate

  @Column({ type: 'enum', enum: PromptType })
  type!: PromptType

  @Column({ type: 'text' })
  contents!: string

  @OneToMany(() => Comment, (comment) => comment.prompt)
  comments!: Comment[]
}
