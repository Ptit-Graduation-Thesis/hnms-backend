import { BadRequestException, Injectable } from '@nestjs/common'
import Joi from 'joi'

import { ImportItemDto, ItemDto, SellItemDto } from './dto'

@Injectable()
export class ItemValidate {
  async getItems(params: { keyword: string; type: number; limit: number; page: number }) {
    try {
      const schema = Joi.object({
        keyword: Joi.string().allow('').required(),
        type: Joi.number().integer().min(0),
        limit: Joi.number().integer().min(0).required(),
        page: Joi.number().integer().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }

  async getItemByQrCodeOrId(params: { qrCodeOrId: string }) {
    try {
      const schema = Joi.object({
        qrCodeOrId: Joi.string().required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }

  async createItem(params: ItemDto) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        des: Joi.string().allow(''),
        price: Joi.number().min(0).required(),
        picture: Joi.object().required(),
        type: Joi.number().integer().min(0).required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }

  async updateItem(itemId: number, params: ItemDto) {
    try {
      const schema = Joi.object({
        itemId: Joi.number().integer().min(0).required(),
        name: Joi.string(),
        des: Joi.string().allow(''),
        price: Joi.number().min(0),
        picture: Joi.object(),
        type: Joi.number().integer().min(0),
      })
      await schema.validateAsync({ ...params, itemId })
    } catch {
      throw new BadRequestException()
    }
  }

  async importItem(params: ImportItemDto) {
    try {
      const schema = Joi.object({
        items: Joi.array()
          .items(
            Joi.object({
              itemId: Joi.number().integer().min(0).required(),
              amount: Joi.number().integer().min(0).required(),
              importPrice: Joi.number().min(0).required(),
            }),
          )
          .required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }

  async sellItem(params: SellItemDto) {
    try {
      const schema = Joi.object({
        customerId: Joi.number().integer().min(0).required(),
        totalPrice: Joi.number().min(0).required(),
        items: Joi.array()
          .items(
            Joi.object({
              itemId: Joi.number().integer().min(0).required(),
              amount: Joi.number().integer().min(0).required(),
            }),
          )
          .required(),
      })
      await schema.validateAsync(params)
    } catch {
      throw new BadRequestException()
    }
  }
}
