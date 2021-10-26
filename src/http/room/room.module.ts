import { Module } from '@nestjs/common'

import { RepositoryModule } from '@/repository'
import { RoomController } from './room.controller'
import { RoomService } from './room.service'
import { RoomValidate } from './room.validate'

@Module({
  imports: [RepositoryModule],
  controllers: [RoomController],
  providers: [RoomService, RoomValidate],
})
export class RoomModule {}
