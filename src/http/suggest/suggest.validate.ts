import { BadRequestException, Injectable } from '@nestjs/common'
import Joi from 'joi'

@Injectable()
export class SuggestValidate {
  async suggestParams(params: { keyword: string }) {
    try {
      const schema = Joi.object({
        keyword: Joi.string().allow('').required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }
}
