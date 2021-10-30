import { EntityRepository, Repository, Like } from 'typeorm'

import { User } from '@/entities/user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async hasUser(username: string) {
    const existUser = await this.findOne({ username })
    return !!existUser
  }

  getUsers(limit: number, offset: number) {
    return this.findAndCount({
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    })
  }

  searchUser(keyword: string, limit: number, offset: number) {
    return this.findAndCount({
      select: ['id', 'fullName'],
      where: { fullName: Like(`%${keyword}%`) },
      take: limit,
      skip: offset,
    })
  }
}
