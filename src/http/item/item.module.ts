import { RepositoryModule } from '@/repository'
import { Module } from '@nestjs/common'

import { S3Service } from '@/s3'
import { ItemController } from './item.controller'
import { ItemService } from './item.service'
import { ItemValidate } from './item.validate'

@Module({
  imports: [RepositoryModule],
  controllers: [ItemController],
  providers: [ItemService, ItemValidate, S3Service],
})
export class ItemModule {}
