import { createConnection } from 'typeorm'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

// eslint-disable-next-line prettier/prettier
;(async function runSeed() {
  const connection = await createConnection()
  const queryRunner = connection.createQueryRunner()
  const saltRounds = +process.env.SALT_ROUNDS

  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
    await queryRunner.manager.insert('roles', [
      { id: 1, name: 'ADMIN' },
      { id: 2, name: 'ACCOUNTANT' },
      { id: 3, name: 'SALE_EMPLOYEE' },
    ])

    await queryRunner.manager.insert('branchs', [
      { id: 1, name: 'Chi nhánh Thái Hà', address: 'Thái Hà, Hà Nội' },
      { id: 2, name: 'Chi nhánh Hà Đông', address: 'Hà Đông, Hà Nội' },
      { id: 3, name: 'Chi nhánh Hải Dương', address: 'Thành phố Hải Dương' },
    ])

    await queryRunner.manager.insert('users', [
      {
        fullName: 'Admin',
        username: 'admin',
        password: bcrypt.hashSync('123456', saltRounds),
        phoneNumber: '097823648273',
        address: 'Xa La, Hà Đông, Hà Nội',
        credentialId: '563453453453345',
        dob: '1999-01-30',
        salary: 50000000,
        status: 1,
        roleId: 1,
        branchId: 1,
      },
      {
        fullName: 'Accountant',
        username: 'accountant',
        password: bcrypt.hashSync('123456', saltRounds),
        phoneNumber: '082342834234',
        address: 'Quang Trung, Hà Đông, Hà Nội',
        credentialId: '45645234534645623',
        dob: '1999-01-30',
        salary: 20000000,
        status: 1,
        roleId: 2,
        branchId: 1,
      },
      {
        fullName: 'Sale employee',
        username: 'sale-employee',
        password: bcrypt.hashSync('123456', saltRounds),
        phoneNumber: '093846537413',
        address: 'Thái Hà, Đống Đa, Hà Nội',
        credentialId: '756345345234242534',
        dob: '1999-01-30',
        salary: 10000000,
        status: 1,
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
