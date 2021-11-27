import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'

import { ItemRepository } from '@/repository'
import { S3Service } from '@/s3'
import { ItemDto } from './dto'
import { generateQrCode } from '@/utils/qr-code'

@Injectable()
export class ItemService {
  constructor(private readonly itemRepo: ItemRepository, private readonly s3Service: S3Service) {}

  async getItems(keyword: string, type: number, limit: number, page: number) {
    const offset = (page - 1) * limit

    const [data, total] = await this.itemRepo.getItems(keyword, type, limit, offset)

    return { data, total, limit, page }
  }

  async createItem(itemDto: ItemDto) {
    let storedPictureKey = ''

    try {
      const { Key: pictureKey, Location: pictureUrl } = await this.s3Service.uploadPublicFile(
        itemDto.picture.buffer,
        itemDto.picture.originalname,
      )
      storedPictureKey = pictureKey

      await this.itemRepo.insert({
        name: itemDto.name,
        des: itemDto.des,
        price: itemDto.price,
        pictureKey,
        pictureUrl,
        qrCode: generateQrCode(+itemDto.type),
        type: itemDto.type,
      })
    } catch {
      if (storedPictureKey) await this.s3Service.deletePublicFile(storedPictureKey)

      throw new InternalServerErrorException()
    }
  }

  async updateItem(itemId: number, itemDto: ItemDto) {
    const existItem = await this.itemRepo.findOne(itemId)
    let pictureKey = ''
    let pictureUrl = ''

    if (!existItem) throw new HttpException('Item does not exist', HttpStatus.NOT_FOUND)

    try {
      if (itemDto.picture) {
        await this.s3Service.deletePublicFile(existItem.pictureKey)
        const { Key, Location } = await this.s3Service.uploadPublicFile(
          itemDto.picture.buffer,
          itemDto.picture.originalname,
        )
        pictureKey = Key
        pictureUrl = Location
      }

      await this.itemRepo.update(itemId, {
        name: itemDto.name || existItem.name,
        des: itemDto.des || existItem.des,
        price: itemDto.price || existItem.price,
        pictureKey: pictureKey || existItem.pictureKey,
        pictureUrl: pictureUrl || existItem.pictureUrl,
        type: itemDto.type || existItem.type,
      })
    } catch {
      if (pictureKey) await this.s3Service.deletePublicFile(pictureKey)

      throw new InternalServerErrorException()
    }
  }
}
