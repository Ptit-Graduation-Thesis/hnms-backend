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
}
