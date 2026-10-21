import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Topic } from './domain/entities/topic.entity'
import { Debate } from './domain/entities/debate.entity'
import { DebateSelect } from './domain/entities/debate-select.entity'
import { Prompt } from './domain/entities/prompt.entity'
import { Comment } from './domain/entities/comment.entity'
import { LlmMessage } from './domain/entities/llm-message.entity'
import { Bet } from './domain/entities/bet.entity'
import { DEBATE_REPOSITORY, TOPIC_REPOSITORY } from './domain/repositories/debate.repository'
import {
  DebateRepositoryImpl,
  TopicRepositoryImpl,
} from './infrastructure/repositories/debate.repository.impl'
import { DebateService } from './application/debate.service'
import { DebateController } from './presentation/debate.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic, Debate, DebateSelect, Prompt, Comment, LlmMessage, Bet]),
  ],
  controllers: [DebateController],
  providers: [
    DebateService,
    { provide: DEBATE_REPOSITORY, useClass: DebateRepositoryImpl },
    { provide: TOPIC_REPOSITORY, useClass: TopicRepositoryImpl },
  ],
  exports: [TypeOrmModule, DebateService],
})
export class DebateModule {}
