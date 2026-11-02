import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Emoji } from './entities/emoji.entity'
import { Item } from './entities/item.entity'
import { MemberItem } from './entities/member-item.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Item, MemberItem, Emoji])],
})
export class ItemModule {}
