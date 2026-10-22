import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '../../../member/domain/entities/member.entity'
import { Prompt } from './prompt.entity'

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ManyToOne(() => Member)
  member: Member

  @ManyToOne(() => Prompt, (prompt) => prompt.comments)
  prompt: Prompt

  @Column({ length: 1000 })
  contents: string
}
