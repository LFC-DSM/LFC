import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bet } from './entities/bet.entity'
import { Comment } from './entities/comment.entity'
import { DebateSelect } from './entities/debate-select.entity'
import { Debate } from './entities/debate.entity'
import { LlmMessage } from './entities/llm-message.entity'
import { Prompt } from './entities/prompt.entity'
import { Topic } from './entities/topic.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Debate, Topic, Prompt, LlmMessage, Comment, Bet, DebateSelect]),
  ],
})
export class DebateModule {}
