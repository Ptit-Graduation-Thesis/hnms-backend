import { EntityRepository, Repository } from 'typeorm'

import { Room } from '@/entities'

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  getRooms(userId: number, limit: number, offset: number) {
    return this.findAndCount({
      select: ['id', 'userOne', 'userTwo'],
      relations: ['userOne', 'userTwo'],
      where: [{ userOneId: userId }, { userTwoId: userId }],
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    })
  }

  findByUser(userId: number, userTwoId: number) {
    return this.findOne({
      select: ['id', 'userOne', 'userTwo'],
      relations: ['userOne', 'userTwo'],
      where: [
        { userOneId: userId, userTwoId },
        { userOneId: userTwoId, userTwoId: userId },
      ],
    })
  }
}
