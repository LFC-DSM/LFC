import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Debate } from '../../domain/entities/debate.entity'
import { Topic } from '../../domain/entities/topic.entity'
import { IDebateRepository, ITopicRepository } from '../../domain/repositories/debate.repository'

@Injectable()
export class DebateRepositoryImpl implements IDebateRepository {
  constructor(
    @InjectRepository(Debate)
    private readonly repo: Repository<Debate>,
  ) {}

  findById(id: number): Promise<Debate | null> {
    return this.repo.findOneBy({ id })
  }

  findAll(): Promise<Debate[]> {
    return this.repo.find()
  }

  save(debate: Debate): Promise<Debate> {
    return this.repo.save(debate)
  }
}

@Injectable()
export class TopicRepositoryImpl implements ITopicRepository {
  constructor(
    @InjectRepository(Topic)
    private readonly repo: Repository<Topic>,
  ) {}

  findById(id: number): Promise<Topic | null> {
    return this.repo.findOneBy({ id })
  }

  findAll(): Promise<Topic[]> {
    return this.repo.find()
  }

  save(topic: Topic): Promise<Topic> {
    return this.repo.save(topic)
  }
}
