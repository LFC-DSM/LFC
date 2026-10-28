import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import { MemberRepositoryImpl } from './infrastructure/repositories/member.repository.impl'
import { MEMBER_REPOSITORY } from './repositories/member.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [{ provide: MEMBER_REPOSITORY, useClass: MemberRepositoryImpl }],
  exports: [MEMBER_REPOSITORY],
})
export class MemberModule {}
