import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '../../../member/domain/entities/member.entity'
import { Topic } from './topic.entity'

@Entity('debate_select')
export class DebateSelect {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number

  @ManyToOne(() => Member, { nullable: false })
  member!: Member

  @ManyToOne(() => Topic, (topic) => topic.debateSelects, { nullable: false })
  topic!: Topic
}
