import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { Item } from './item.entity'

@Injectable()
export class ItemsService {
  private items: Item[] = []
  private nextId = 1

  findAll(): Item[] {
    return this.items
  }

  findOne(id: number): Item {
    const item = this.items.find((i) => i.id === id)
    if (!item) throw new NotFoundException(`Item #${id} not found`)
    return item
  }

  create(dto: CreateItemDto): Item {
    const item: Item = { id: this.nextId++, ...dto }
    this.items.push(item)
    return item
  }
}
