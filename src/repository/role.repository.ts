import { EntityRepository, Like, Repository } from 'typeorm'

import { Role } from '@/entities'

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  suggestRoles(keyword: string) {
    return this.findAndCount({
      select: ['id'],
      where: { name: Like(`%${keyword}%`) },
    })
  }
}
