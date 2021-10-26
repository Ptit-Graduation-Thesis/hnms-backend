import { createConnection } from 'typeorm'
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

import { Branch, Role, User } from '../../entities'

dotenv.config()

// eslint-disable-next-line prettier/prettier
;(async function runSeed() {
  const connection = await createConnection()
  const queryRunner = connection.createQueryRunner()

  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
    await queryRunner.manager.insert(Role, [
      { id: 1, name: 'ADMIN' },
      { id: 2, name: 'ACCOUNTING' },
      { id: 3, name: 'SALE_EMPLOYEE' },
    ])

    await queryRunner.manager.insert(Branch, [
      { id: 1, name: 'Branch 1', address: 'Thai Ha, Ha Noi' },
      { id: 2, name: 'Branch 2', address: 'Ha Dong, Ha Noi' },
      { id: 3, name: 'Branch 3', address: 'Thanh pho Hai Duong' },
    ])

    await queryRunner.manager.insert(User, [
      {
        fullName: 'Admin',
        username: 'admin',
        password: bcrypt.hashSync('123456', +process.env.SALT_ROUNDS),
        phoneNumber: '0123456789',
        address: 'Ha Noi',
        credentialId: '0123456789',
        dob: '1999-01-30',
        salary: 50000000,
        roleId: 1,
        branchId: 1,
      },
      {
        fullName: 'Accounting',
        username: 'accounting',
        password: bcrypt.hashSync('123456', +process.env.SALT_ROUNDS),
        phoneNumber: '0123456789',
        address: 'Ha Noi',
        credentialId: '0123456789',
        dob: '1999-01-30',
        salary: 20000000,
        roleId: 2,
        branchId: 1,
      },
      {
        fullName: 'Sale employee',
        username: 'sale-employee',
        password: bcrypt.hashSync('123456', +process.env.SALT_ROUNDS),
        phoneNumber: '0123456789',
        address: 'Ha Noi',
        credentialId: '0123456789',
        dob: '1999-01-30',
        salary: 10000000,
        roleId: 3,
        branchId: 1,
      },
    ])

    await queryRunner.commitTransaction()
  } catch {
    await queryRunner.rollbackTransaction()
  } finally {
    await queryRunner.release()
  }

  process.exit()
})()
