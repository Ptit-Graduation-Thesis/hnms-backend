import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { MessageRepository, RoomRepository } from '@/repository'
import { Room } from '@/entities'

@Injectable()
export class RoomService {
  constructor(private readonly roomRepo: RoomRepository, private readonly messageRepo: MessageRepository) {}

  async getRooms(userId: number, limit: number, page: number) {
    const offset = (page - 1) * limit
    const [rooms, total] = await this.roomRepo.getRooms(userId, limit, offset)

    const data = rooms.map((room) => ({ id: room.id, otherUserName: getOtherUserName(userId, room) }))

    return { data, total, limit, page }
  }

  async enterRoom(userId: number, userTwoId: number) {
    const existRoom = await this.roomRepo.findByUser(userId, userTwoId)

    if (!!existRoom) return { roomId: existRoom.id, otherUserName: getOtherUserName(userId, existRoom) }

    try {
      await this.roomRepo.insert({ userOneId: userId, userTwoId })
      return this.enterRoom(userId, userTwoId)
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async getMessages(roomId: number, limit: number, page: number) {
    const offset = (page - 1) * limit
    const [data, total] = await this.messageRepo.getMessages(roomId, limit, offset)
    return { data, total, limit, page }
  }
}

function getOtherUserName(userId: number, room: Room) {
  if (room.userOneId !== userId) return room.userOne.fullName
  return room.userTwo.fullName
}
