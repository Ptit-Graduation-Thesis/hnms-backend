import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import bcrypt from 'bcrypt'

import { UserRepository } from '@/repository'
import { ProfileDto } from './dto'

@Injectable()
export class ProfileService {
  constructor(private readonly userRepo: UserRepository, private readonly configService: ConfigService) {}

  async updateProfile(userId: number, profile: ProfileDto) {
    const existUser = await this.userRepo
      .createQueryBuilder('users')
      .select(['users', 'users.password'])
      .where('users.id = :userId', { userId })
      .getOne()

    if (profile.username !== existUser.username) {
      const hasUser = await this.userRepo.hasUser(profile.username)
      if (hasUser) throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }

    try {
      const user = await this.userRepo.save({
        id: userId,
        fullName: profile.fullName || existUser.fullName,
        username: profile.username || existUser.username,
        password: profile.password
          ? bcrypt.hashSync(profile.password, +this.configService.get('SALT_ROUNDS'))
          : existUser.password,
        phoneNumber: profile.phoneNumber || existUser.phoneNumber,
        address: profile.address || existUser.address,
        dob: profile.dob || existUser.dob,
      })

      const { fullName, phoneNumber, address, dob, username } = user

      return { fullName, phoneNumber, address, dob, username }
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
