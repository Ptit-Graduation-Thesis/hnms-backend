import { BadRequestException, Injectable } from '@nestjs/common'
import Joi from 'joi'
import { CustomerDto } from './dto'

@Injectable()
export class CustomerValidate {
  async getCustomers(params: { keyword: string; limit: number; page: number }) {
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

  async createCustomer(customerDto: CustomerDto) {
    try {
      const schema = Joi.object({
        fullName: Joi.string().required(),
        dob: Joi.date().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
      })
      await schema.validateAsync(customerDto)
    } catch {
      throw new BadRequestException()
    }
  }

  async updateCustomer(customerId: number, customerDto: CustomerDto) {
    try {
      const schema = Joi.object({
        customerId: Joi.number().integer().min(0).required(),
        fullName: Joi.string(),
        dob: Joi.date(),
        phoneNumber: Joi.string(),
        address: Joi.string(),
      })
      await schema.validateAsync({ ...customerDto, customerId })
    } catch {
      throw new BadRequestException()
    }
  }
}
