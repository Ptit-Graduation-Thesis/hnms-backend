import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import bcrypt from 'bcrypt'

import { UserRepository } from '@/repository'
import { UserStatus } from '@/enums'
import { UserDto } from './dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository, private readonly configService: ConfigService) {}

  async getUsers(roles: number[], branchs: number[], status: number, keyword: string, limit: number, page: number) {
    const offset = (page - 1) * limit
    const [data, total] = await this.userRepo.getUsers(roles, branchs, status, keyword, limit, offset)
    return { data, total, limit, offset }
  }

  async getUser(userId: number) {
    const user = await this.userRepo.findOne(userId, { relations: ['role', 'branch'] })

    if (!user) throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)

    return user
  }

  async searchUser(keyword: string, limit: number, page: number) {
    const offset = (page - 1) * limit
    const [data, total] = await this.userRepo.searchUser(keyword, limit, offset)
    return { data, total, limit, page }
  }

  async createUser(user: UserDto) {
    const hasUsername = await this.userRepo.hasUsername(user.username)
    if (hasUsername) throw new HttpException('Username already exist', HttpStatus.BAD_REQUEST)

    const hasPhoneNumber = await this.userRepo.hasPhoneNumber(user.phoneNumber)
    if (hasPhoneNumber) throw new HttpException('Phone number already exist', HttpStatus.BAD_REQUEST)

    const hasCredentialId = await this.userRepo.hasCredentialId(user.credentialId)
    if (hasCredentialId) throw new HttpException('Credential ID already exist', HttpStatus.BAD_REQUEST)

    try {
      await this.userRepo.insert({
        ...user,
        status: UserStatus.ACTIVE,
        password: bcrypt.hashSync(user.password, +this.configService.get('SALT_ROUNDS')),
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async updateUser(userId: number, userDto: UserDto) {
    const existUser = await this.userRepo
      .createQueryBuilder('users')
      .select(['users', 'users.password'])
      .where('users.id = :userId', { userId })
      .getOne()

    if (!existUser) throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)

    if (userDto.username !== existUser.username) {
      const hasUsername = await this.userRepo.hasUsername(userDto.username)
      if (hasUsername) throw new HttpException('Username already exist', HttpStatus.BAD_REQUEST)
    }

    if (userDto.phoneNumber !== existUser.phoneNumber) {
      const hasPhoneNumber = await this.userRepo.hasPhoneNumber(userDto.phoneNumber)
      if (hasPhoneNumber) throw new HttpException('Phone number already exist', HttpStatus.BAD_REQUEST)
    }

    if (userDto.credentialId !== existUser.credentialId) {
      const hasCredentialId = await this.userRepo.hasCredentialId(userDto.credentialId)
      if (hasCredentialId) throw new HttpException('Credential ID already exist', HttpStatus.BAD_REQUEST)
    }

    try {
      await this.userRepo.update(userId, {
        fullName: userDto.fullName || existUser.fullName,
        username: userDto.username || existUser.username,
        password: userDto.password
          ? bcrypt.hashSync(userDto.password, +this.configService.get('SALT_ROUNDS'))
          : existUser.password,
        phoneNumber: userDto.phoneNumber || existUser.phoneNumber,
        address: userDto.address || existUser.address,
        credentialId: userDto.credentialId || existUser.credentialId,
        dob: userDto.dob || existUser.dob,
        salary: userDto.salary || existUser.salary,
        status: userDto.status ?? existUser.status,
        roleId: userDto.roleId || existUser.roleId,
        branchId: userDto.branchId || existUser.branchId,
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
