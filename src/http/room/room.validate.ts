import { Injectable, BadRequestException } from '@nestjs/common'
import * as Joi from 'joi'

@Injectable()
export class RoomValidate {
  async getRooms(params: { limit: number; page: number }) {
    try {
      const schema = Joi.object({
        limit: Joi.number().min(0),
        page: Joi.number().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async enterRoom(params: { userTwoId: number }) {
    try {
      const schema = Joi.object({
        userTwoId: Joi.number().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async getMessages(params: { roomId: number; limit: number; page: number }) {
    try {
      const schema = Joi.object({
        roomId: Joi.number().min(0).required(),
        limit: Joi.number().min(0),
        page: Joi.number().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
