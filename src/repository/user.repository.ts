import { EntityRepository, Repository } from 'typeorm'

import { User } from '@/entities/user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async hasUser(username: string) {
    const existUser = await this.findOne({ username })
    return !!existUser
  }

  searchUser(keyword: string, limit: number, offset: number) {
    return this.createQueryBuilder('users')
      .where('users.fullName like :keyword', { keyword: `%${keyword}%` })
      .limit(limit)
      .offset(offset)
      .getManyAndCount()
  }
}
