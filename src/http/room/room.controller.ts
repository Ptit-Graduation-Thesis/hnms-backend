import { User } from '@/decorator'
import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { RoomService } from './room.service'
import { RoomValidate } from './room.validate'
import { EnterRoomDto } from './dto'

@ApiTags('Room')
@ApiBearerAuth()
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService, private readonly roomValidate: RoomValidate) {}

  @Get()
  @HttpCode(200)
  async getRooms(@User('id') userId: number, @Query('limit') limit = 10, @Query('page') page = 1) {
    await this.roomValidate.getRooms({ limit, page })

    return this.roomService.getRooms(userId, limit, page)
  }

  @Post('/enter')
  @HttpCode(200)
  async enterRoom(@User('id') userId: number, @Body() enterRoomDto: EnterRoomDto) {
    await this.roomValidate.enterRoom(enterRoomDto)

    return this.roomService.enterRoom(userId, enterRoomDto.userTwoId)
  }

  @Get('/:roomId/messages')
  @HttpCode(200)
  async getMessages(@Param('roomId') roomId: number, @Query('limit') limit = 10, @Query('page') page = 1) {
    await this.roomValidate.getMessages({ roomId, limit, page })

    return this.roomService.getMessages(roomId, limit, page)
  }
}
