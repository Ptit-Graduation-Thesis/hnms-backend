import { EntityRepository, Repository } from 'typeorm'

import { Room } from '@/entities'

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  getRooms(userId: number, limit: number, offset: number) {
    return this.createQueryBuilder('rooms')
      .leftJoinAndSelect('rooms.userOne', 'userOne')
      .leftJoinAndSelect('rooms.userTwo', 'userTwo')
      .where('rooms.userOneId = :userId', { userId })
      .orWhere('rooms.userTwoId = :userId', { userId })
      .limit(limit)
      .offset(offset)
      .orderBy('rooms.id', 'DESC')
      .getManyAndCount()
  }

  findByUser(userId: number, userTwoId: number) {
    return this.createQueryBuilder('rooms')
      .leftJoinAndSelect('rooms.userOne', 'userOne')
      .leftJoinAndSelect('rooms.userTwo', 'userTwo')
      .where('rooms.userOneId = :userId AND rooms.userTwoId = :userTwoId', { userId, userTwoId })
      .orWhere('rooms.userOneId = :userTwoId AND rooms.userTwoId = :userId', { userId, userTwoId })
      .getOne()
  }
}
