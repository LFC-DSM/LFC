import { Item } from '../entities/item.entity'

export const ITEM_REPOSITORY = Symbol('IItemRepository')

export interface IItemRepository {
  findById(id: number): Promise<Item | null>
  findAll(): Promise<Item[]>
  save(item: Item): Promise<Item>
  delete(id: number): Promise<void>
}
