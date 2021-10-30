import { BadRequestException, Injectable } from '@nestjs/common'
import Joi from 'joi'

import { ProfileDto } from './dto'

@Injectable()
export class ProfileValidate {
  async updateProfile(params: ProfileDto) {
    try {
      const schema = Joi.object({
        fullName: Joi.string(),
        username: Joi.string(),
        password: Joi.string().min(6),
        confirmPassword: Joi.string().equal(Joi.ref('password')),
        phoneNumber: Joi.string(),
        address: Joi.string(),
        dob: Joi.date(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }
}
