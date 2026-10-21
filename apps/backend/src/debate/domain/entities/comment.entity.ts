import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '../../../member/domain/entities/member.entity'
import { Prompt } from './prompt.entity'

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number

  @ManyToOne(() => Member, { nullable: false })
  member!: Member

  @ManyToOne(() => Prompt, (prompt) => prompt.comments, { nullable: false })
  prompt!: Prompt

  @Column({ length: 1000 })
  contents!: string
}
