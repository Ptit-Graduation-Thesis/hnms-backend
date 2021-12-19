import { BadRequestException, Injectable } from '@nestjs/common'
import Joi from 'joi'

@Injectable()
export class StatisticValidate {
  async getMonthRevenue(month: string) {
    try {
      const schema = Joi.object({
        month: Joi.date().required(),
      })
      await schema.validateAsync({ month })
    } catch {
      throw new BadRequestException()
    }
  }

  async getYearRevenue(year: string) {
    try {
      const schema = Joi.object({
        year: Joi.date().required(),
      })
      await schema.validateAsync({ year })
    } catch {
      throw new BadRequestException()
    }
  }
}
