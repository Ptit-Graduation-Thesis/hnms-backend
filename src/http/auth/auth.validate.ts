import { BadRequestException, Injectable } from '@nestjs/common'
import * as Joi from 'joi'

import { LoginDto } from '@/http/auth/dto'

@Injectable()
export class AuthValidate {
  async login(login: LoginDto) {
    try {
      const schema = Joi.object({
        username: Joi.string().required().max(127).required(),
        password: Joi.string().required().min(6).max(127).required(),
      })

      return await schema.validateAsync(login)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
