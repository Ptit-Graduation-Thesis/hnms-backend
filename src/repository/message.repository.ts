import { EntityRepository, Repository } from 'typeorm'

import { Message } from '@/entities'

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  getMessages(roomId: number, limit: number, offset: number) {
    return this.findAndCount({
      relations: ['user'],
      where: { roomId },
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    })
  }
}
