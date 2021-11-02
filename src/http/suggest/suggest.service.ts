import { getRoleName } from '@/enums'
import { BranchRepository, RoleRepository } from '@/repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SuggestService {
  constructor(private readonly roleRepo: RoleRepository, private readonly branchRepo: BranchRepository) {}

  async suggestRoles(keyword: string) {
    const [roles, total] = await this.roleRepo.suggestRoles(keyword)

    const data = roles.map((role) => ({ id: role.id, name: getRoleName(role.id) }))

    return { data, total }
  }

  async sugegstBranchs(keyword: string) {
    const [data, total] = await this.branchRepo.suggestBranchs(keyword)
    return { data, total }
  }
}
