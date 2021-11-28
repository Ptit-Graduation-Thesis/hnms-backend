import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { getConnection } from 'typeorm'

import { ItemRepository } from '@/repository'
import { S3Service } from '@/s3'
import { ImportItemDto, ItemDto } from './dto'
import { generateQrCode } from '@/utils/qr-code'
import { BranchItem, ImportBill, Item } from '@/entities'
import { ImportedItem } from '@/entities/imported-item.entity'

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

  async importItem(userId: number, branchId: number, importItemDto: ImportItemDto) {
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const importBill = await queryRunner.manager.save(ImportBill, { userId })

      await Promise.all(
        importItemDto.items.map(async (item) => {
          const existItem = await queryRunner.manager.findOne(Item, item.itemId)

          if (!existItem) throw new HttpException('Item does not exist', HttpStatus.NOT_FOUND)

          const existBranchItem = await queryRunner.manager.findOne(BranchItem, { itemId: item.itemId, branchId })

          if (existBranchItem) {
            await queryRunner.manager.increment(BranchItem, { itemId: item.itemId, branchId }, 'amount', item.amount)
            await queryRunner.manager.insert(ImportedItem, {
              amount: item.amount,
              importPrice: item.importPrice,
              branchItemId: existBranchItem.id,
              importBillId: importBill.id,
            })

            return
          }
          const branchItem = await queryRunner.manager.save(BranchItem, {
            amount: item.amount,
            itemId: item.itemId,
            branchId,
          })
          await queryRunner.manager.insert(ImportedItem, {
            amount: item.amount,
            importPrice: item.importPrice,
            branchItemId: branchItem.id,
            importBillId: importBill.id,
          })
        }),
      )

      await queryRunner.commitTransaction()
    } catch {
      await queryRunner.rollbackTransaction()

      throw new InternalServerErrorException()
    } finally {
      await queryRunner.release()
    }
  }
}
