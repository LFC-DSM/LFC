import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Member } from '../../domain/entities/member.entity'
import { IMemberRepository } from '../../domain/repositories/member.repository'

@Injectable()
export class MemberRepositoryImpl implements IMemberRepository {
  constructor(
    @InjectRepository(Member)
    private readonly repo: Repository<Member>,
  ) {}

  findById(id: number): Promise<Member | null> {
    return this.repo.findOneBy({ id })
  }

  findByEmail(email: string): Promise<Member | null> {
    return this.repo.findOneBy({ email })
  }

  save(member: Member): Promise<Member> {
    return this.repo.save(member)
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }
}
