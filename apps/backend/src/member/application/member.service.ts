import { Inject, Injectable } from '@nestjs/common'
import { IMemberRepository, MEMBER_REPOSITORY } from '../domain/repositories/member.repository'

@Injectable()
export class MemberService {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly memberRepository: IMemberRepository,
  ) {}
}
