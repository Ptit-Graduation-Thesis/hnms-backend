import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import bcrypt from 'bcrypt'

import { UserRepository } from '@/repository'
import { UserStatus } from '@/enums'
import { UserDto } from './dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository, private readonly configService: ConfigService) {}

  async getUsers(limit: number, page: number) {
    const offset = (page - 1) * limit
    const [data, total] = await this.userRepo.getUsers(limit, offset)
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
    const hasUser = await this.userRepo.hasUser(user.username)

    if (hasUser) throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)

    try {
      const hashPassword = await bcrypt.hash(user.password, +this.configService.get('SALT_ROUNDS'))
      await this.userRepo.insert({ ...user, status: UserStatus.ACTIVE, password: hashPassword })
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
      const hasUser = await this.userRepo.hasUser(userDto.username)
      if (hasUser) throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
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
        status: userDto.status || existUser.status,
        roleId: userDto.roleId || existUser.roleId,
        branchId: userDto.branchId || existUser.branchId,
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
