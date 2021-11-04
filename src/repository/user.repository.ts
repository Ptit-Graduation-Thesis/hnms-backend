import { EntityRepository, Repository, Like, In } from 'typeorm'

import { User } from '@/entities/user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async hasUsername(username: string) {
    const existUser = await this.findOne({ username })
    return !!existUser
  }

  async hasPhoneNumber(phoneNumber: string) {
    const existUser = await this.findOne({ phoneNumber })
    return !!existUser
  }

  async hasCredentialId(credentialId: string) {
    const existUser = await this.findOne({ credentialId })
    return !!existUser
  }

  getUsers(roles: number[], branchs: number[], status: number, keyword: string, limit: number, offset: number) {
    let conditions = [
      { fullName: Like(`%${keyword}%`) },
      { username: Like(`%${keyword}%`) },
      { phoneNumber: Like(`%${keyword}%`) },
      { credentialId: Like(`%${keyword}%`) },
    ]

    if (roles.length > 0) conditions = conditions.map((condition) => ({ ...condition, roleId: In(roles) }))
    if (branchs.length > 0) conditions = conditions.map((condition) => ({ ...condition, branchId: In(branchs) }))
    if (status !== undefined) conditions = conditions.map((condition) => ({ ...condition, status }))

    return this.findAndCount({
      relations: ['role', 'branch'],
      where: conditions,
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
