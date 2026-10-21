import { Inject, Injectable } from '@nestjs/common'
import { IItemRepository, ITEM_REPOSITORY } from '../domain/repositories/item.repository'

@Injectable()
export class ItemService {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly itemRepository: IItemRepository,
  ) {}
}
