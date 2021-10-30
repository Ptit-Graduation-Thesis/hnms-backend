import { BadRequestException, Injectable } from '@nestjs/common'
import Joi from 'joi'

import { UserDto } from './dto'

@Injectable()
export class UserValidate {
  async getUsers(params: { limit: number; page: number }) {
    try {
      const schema = Joi.object({
        limit: Joi.number().integer().min(0).required(),
        page: Joi.number().integer().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }

  async getUser(params: { userId: number }) {
    try {
      const schema = Joi.object({
        userId: Joi.number().integer().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }

  async searchUser(params: { keyword: string; limit: number; page: number }) {
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

  async createUser(params: UserDto) {
    try {
      const schema = Joi.object({
        fullName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        credentialId: Joi.string().required(),
        dob: Joi.date().required(),
        salary: Joi.number().min(0).required(),
        roleId: Joi.number().integer().min(0).required(),
        branchId: Joi.number().integer().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }

  async updateUser(params: UserDto) {
    try {
      const schema = Joi.object({
        fullName: Joi.string(),
        username: Joi.string(),
        password: Joi.string().min(6),
        phoneNumber: Joi.string(),
        address: Joi.string(),
        credentialId: Joi.string(),
        dob: Joi.date(),
        salary: Joi.number().min(0),
        status: Joi.number().min(0),
        roleId: Joi.number().integer().min(0),
        branchId: Joi.number().integer().min(0),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }
}
