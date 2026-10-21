import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Member } from './domain/entities/member.entity'
import { MoneyLog } from './domain/entities/money-log.entity'
import { MEMBER_REPOSITORY } from './domain/repositories/member.repository'
import { MemberRepositoryImpl } from './infrastructure/repositories/member.repository.impl'
import { MemberService } from './application/member.service'
import { MemberController } from './presentation/member.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Member, MoneyLog])],
  controllers: [MemberController],
  providers: [MemberService, { provide: MEMBER_REPOSITORY, useClass: MemberRepositoryImpl }],
  exports: [TypeOrmModule, MemberService],
})
export class MemberModule {}
