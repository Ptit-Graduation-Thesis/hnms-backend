import { BadRequestException, Injectable } from '@nestjs/common'
import Joi from 'joi'

import { BranchDto } from './dto'

@Injectable()
export class BranchValidate {
  async getbranchs(params: { keyword: string; limit: number; page: number }) {
    try {
      const schema = Joi.object({
        keyword: Joi.string().allow('').required(),
        limit: Joi.number().integer().min(0).required(),
        page: Joi.number().integer().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }

  async createBranch(params: BranchDto) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }

  async updateBranch(branchId: number, params: BranchDto) {
    try {
      const schema = Joi.object({
        branchId: Joi.number().integer().min(0).required(),
        name: Joi.string(),
        address: Joi.string(),
      })
      await schema.validateAsync({ ...params, branchId })
    } catch {
      throw new BadRequestException()
    }
  }
}
