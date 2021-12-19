import { EntityRepository, Like, Repository } from 'typeorm'

import { Item } from '@/entities'

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  getItems(keyword: string, type: number, limit: number, offset: number) {
    let conditions = [{ name: Like(`%${keyword}%`) }, { qrCode: Like(`%${keyword}%`) }]

    if (type) conditions = conditions.map((condition) => ({ ...condition, type }))

    return this.findAndCount({
      where: conditions,
      relations: ['branchItems', 'branchItems.branch'],
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    })
  }

  getItemByQrCodeOrId(qrCodeOrId: string) {
    return this.findOne({
      where: [{ id: qrCodeOrId }, { qrCode: qrCodeOrId }],
      relations: ['branchItems', 'branchItems.branch'],
    })
  }
}
