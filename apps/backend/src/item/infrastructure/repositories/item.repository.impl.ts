import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Item } from '../../domain/entities/item.entity'
import { IItemRepository } from '../../domain/repositories/item.repository'

@Injectable()
export class ItemRepositoryImpl implements IItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>,
  ) {}

  findById(id: number): Promise<Item | null> {
    return this.repo.findOneBy({ id })
  }

  findAll(): Promise<Item[]> {
    return this.repo.find()
  }

  save(item: Item): Promise<Item> {
    return this.repo.save(item)
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }
}
