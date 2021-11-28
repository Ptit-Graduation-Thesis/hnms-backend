import { EntityRepository, Like, Repository } from 'typeorm'

import { Customer } from '@/entities'

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async hasPhoneNumber(phoneNumber: string) {
    const existCustomer = await this.findOne({ phoneNumber })
    return !!existCustomer
  }

  getCustomers(keyword: string, limit: number, offset: number) {
    return this.findAndCount({
      where: [{ fullName: Like(`%${keyword}%`) }, { phoneNumber: Like(`%${keyword}%`) }],
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    })
  }
}
