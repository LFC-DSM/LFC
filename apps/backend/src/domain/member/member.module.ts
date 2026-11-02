import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import { MoneyLog } from './entities/money-log.entity'
import { MemberRepositoryImpl } from './infrastructure/repositories/member.repository.impl'
import { MEMBER_REPOSITORY } from './repositories/member.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Member, MoneyLog])],
  providers: [{ provide: MEMBER_REPOSITORY, useClass: MemberRepositoryImpl }],
  exports: [MEMBER_REPOSITORY],
})
export class MemberModule {}
