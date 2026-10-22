import { Debate } from '../entities/debate.entity'
import { Topic } from '../entities/topic.entity'

export const DEBATE_REPOSITORY = Symbol('IDebateRepository')
export const TOPIC_REPOSITORY = Symbol('ITopicRepository')

export interface IDebateRepository {
  findById(id: number): Promise<Debate | null>
  findAll(): Promise<Debate[]>
  save(debate: Debate): Promise<Debate>
}

export interface ITopicRepository {
  findById(id: number): Promise<Topic | null>
  findAll(): Promise<Topic[]>
  save(topic: Topic): Promise<Topic>
}
