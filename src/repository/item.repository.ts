import { EntityRepository, Like, Repository } from 'typeorm'

import { Item } from '@/entities'

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  getItems(keyword: string, type: number, limit: number, offset: number) {
    let conditions = [{ name: Like(`%${keyword}%`) }, { qrCode: Like(`%${keyword}%`) }]

    if (type) conditions = conditions.map((condition) => ({ ...condition, type }))

    return this.findAndCount({
      where: conditions,
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    })
  }
}
