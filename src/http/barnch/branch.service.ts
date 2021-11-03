import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'

import { BranchRepository } from '@/repository'
import { BranchDto } from './dto'

@Injectable()
export class BranchService {
  constructor(private readonly branchRepo: BranchRepository) {}

  async getBranchs(keyword: string, limit: number, page: number) {
    const offset = (page - 1) * limit
    const [data, total] = await this.branchRepo.getBranchs(keyword, limit, offset)
    return { data, total, limit, page }
  }

  async createBranch(branch: BranchDto) {
    try {
      await this.branchRepo.insert(branch)
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async updateBranch(branchId: number, branch: BranchDto) {
    const existBranch = await this.branchRepo.findOne(branchId)

    if (!existBranch) throw new HttpException('Branch does not exist', HttpStatus.NOT_FOUND)

    try {
      await this.branchRepo.update(branchId, {
        name: branch.name || existBranch.name,
        address: branch.address || existBranch.address,
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
