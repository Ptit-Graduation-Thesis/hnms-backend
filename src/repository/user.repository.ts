import { EntityRepository, Repository } from 'typeorm'

import { User } from '@/entities/user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async hasUser(username: string) {
    const existUser = await this.findOne({ username })

    if (!existUser) return false

    return true
  }
}
