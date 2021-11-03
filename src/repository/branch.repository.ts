import { EntityRepository, Like, Repository } from 'typeorm'

import { Branch } from '@/entities'

@EntityRepository(Branch)
export class BranchRepository extends Repository<Branch> {
  suggestBranchs(keyword: string) {
    return this.findAndCount({
      select: ['id', 'name', 'address'],
      where: { name: Like(`%${keyword}%`) },
    })
  }

  getBranchs(keyword: string, limit: number, offset: number) {
    return this.findAndCount({
      select: ['id', 'name', 'address'],
      where: [{ name: Like(`%${keyword}%`) }, { address: Like(`%${keyword}%`) }],
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    })
  }
}
