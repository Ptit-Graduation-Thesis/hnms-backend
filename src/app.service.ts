import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { getConnection } from 'typeorm'

import { Role, User } from '@/entities'

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async initialDatabase() {
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.insert(Role, [
        { id: 1, name: 'ADMIN' },
        { id: 2, name: 'ACCOUNTING' },
        { id: 3, name: 'SALE_EMPLOYEE' },
      ])

      await queryRunner.manager.insert(User, [
        {
          fullName: 'Hieu Nguyen',
          username: 'admin',
          password: bcrypt.hashSync('admin123', +this.configService.get('SALT_ROUNDS')),
          phoneNumber: '0123456789',
          address: 'HN',
          credentialId: '0123456789',
          dob: '1999-01-30',
          salary: 10000000,
          roleId: 1,
        },
      ])

      await queryRunner.commitTransaction()
    } catch {
      await queryRunner.rollbackTransaction()

      throw new InternalServerErrorException()
    } finally {
      await queryRunner.release()
    }
  }
}
