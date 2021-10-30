import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'

import { UserRepository } from '@/repository'
import { UserStatus } from '@/enums'
import { formatDate } from '@/utils/date'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login({ username, password }) {
    const existUser = await this.userRepo.findOne(
      { username, status: UserStatus.ACTIVE },
      {
        select: ['id', 'fullName', 'phoneNumber', 'address', 'credentialId', 'dob', 'salary', 'password'],
        relations: ['role', 'branch'],
      },
    )

    if (!existUser || !(await bcrypt.compare(password || '', existUser.password)))
      throw new HttpException('Username or password was incorrect', HttpStatus.UNAUTHORIZED)

    const { id, fullName, phoneNumber, address, credentialId, dob, salary } = existUser
    const { id: roleId, name: roleName } = existUser.role
    const { id: branchId, name: branchName, address: branchAddress } = existUser.branch

    return {
      user: {
        id,
        fullName,
        phoneNumber,
        address,
        credentialId,
        dob: formatDate(dob),
        salary,
        role: { id: roleId, roleName },
        branch: { id: branchId, name: branchName, address: branchAddress },
      },
      accessToken: this.jwtService.sign({ id: existUser.id }),
      expiresIn: this.configService.get('EXPIRES_IN'),
    }
  }
}
