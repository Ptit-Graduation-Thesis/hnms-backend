import { BadRequestException, Injectable } from '@nestjs/common'
import Joi from 'joi'

import { LoginDto } from './dto'

@Injectable()
export class AuthValidate {
  async login(loginParam: LoginDto) {
    try {
      const schema = Joi.object({
        username: Joi.string().max(127).required(),
        password: Joi.string().min(6).max(127).required(),
      })

      return await schema.validateAsync(loginParam)
    } catch {
      throw new BadRequestException()
    }
  }
}
