import { Injectable, BadRequestException } from '@nestjs/common'
import Joi from 'joi'

@Injectable()
export class RoomValidate {
  async getRooms(params: { limit: number; page: number }) {
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

  async enterRoom(params: { userTwoId: number }) {
    try {
      const schema = Joi.object({
        userTwoId: Joi.number().integer().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }

  async getMessages(params: { roomId: number; limit: number; page: number }) {
    try {
      const schema = Joi.object({
        roomId: Joi.number().integer().min(0).required(),
        limit: Joi.number().integer().min(0).required(),
        page: Joi.number().integer().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }
}
