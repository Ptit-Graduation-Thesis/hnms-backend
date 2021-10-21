import { BadRequestException, Injectable } from '@nestjs/common'
import * as Joi from 'joi'

import { LoginDto } from '@/http/auth/dto'

@Injectable()
export class AuthValidate {
  async login(login: LoginDto) {
    try {
      const schema = Joi.object({
        username: Joi.string().max(127),
        password: Joi.string().min(6).max(127),
      })

      return await schema.validateAsync(login)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
