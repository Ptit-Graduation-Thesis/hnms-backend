import { BadRequestException, Injectable } from '@nestjs/common'
import * as Joi from 'joi'

@Injectable()
export class UserValidate {
  async searchUser(params: { keyword: string; limit: number; page: number }) {
    try {
      const schema = Joi.object({
        keyword: Joi.string().allow(''),
        limit: Joi.number().min(0),
        page: Joi.number().min(0),
      })
      await schema.validateAsync(params)
    } catch (error) {
      console.log(error)

      throw new BadRequestException()
    }
  }
}
