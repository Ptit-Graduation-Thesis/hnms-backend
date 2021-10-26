import { Injectable } from '@nestjs/common'

import { UserRepository } from '@/repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async searchUser(keyword: string, limit: number, page: number) {
    const offset = (page - 1) * limit
    const [users, total] = await this.userRepo.searchUser(keyword, limit, offset)
    const data = users.map((user) => ({ id: user.id, fullName: user.fullName }))
    return { data, total, limit, page }
  }
}
