import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from './domain/entities/item.entity'
import { MemberItem } from './domain/entities/member-item.entity'
import { Emoji } from './domain/entities/emoji.entity'
import { ITEM_REPOSITORY } from './domain/repositories/item.repository'
import { ItemRepositoryImpl } from './infrastructure/repositories/item.repository.impl'
import { ItemService } from './application/item.service'
import { ItemController } from './presentation/item.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Item, MemberItem, Emoji])],
  controllers: [ItemController],
  providers: [ItemService, { provide: ITEM_REPOSITORY, useClass: ItemRepositoryImpl }],
  exports: [TypeOrmModule, ItemService],
})
export class ItemModule {}
