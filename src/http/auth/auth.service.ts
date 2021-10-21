import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { UserRepository } from '@/repository'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login({ username, password }) {
    const existUser = await this.userRepo.findOne(
      { username },
      { select: ['password'] },
    )

    if (
      !existUser ||
      !(await bcrypt.compare(password || '', existUser.password))
    ) {
      throw new HttpException(
        {
          statusCode: 401,
          message: 'Username or password is incorrect',
        },
        HttpStatus.UNAUTHORIZED,
      )
    }

    return {
      accessToken: this.jwtService.sign({ id: existUser.id }),
      expiresIn: this.configService.get('EXPIRES_IN'),
    }
  }
}
