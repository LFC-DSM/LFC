import { Inject, Injectable } from '@nestjs/common'
import {
  IDebateRepository,
  ITopicRepository,
  DEBATE_REPOSITORY,
  TOPIC_REPOSITORY,
} from '../domain/repositories/debate.repository'

@Injectable()
export class DebateService {
  constructor(
    @Inject(DEBATE_REPOSITORY)
    private readonly debateRepository: IDebateRepository,
    @Inject(TOPIC_REPOSITORY)
    private readonly topicRepository: ITopicRepository,
  ) {}
}
