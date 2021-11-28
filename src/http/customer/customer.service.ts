import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'

import { CustomerRepository } from '@/repository'
import { CustomerDto } from './dto'

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async getCustomers(keyword: string, limit: number, page: number) {
    const offset = (page - 1) * limit
    const [data, total] = await this.customerRepo.getCustomers(keyword, limit, offset)
    return { data, total, limit, page }
  }

  async createCustomer(customerDto: CustomerDto) {
    const hasPhoneNumber = await this.customerRepo.hasPhoneNumber(customerDto.phoneNumber)

    if (hasPhoneNumber) throw new HttpException('Phone number already exist', HttpStatus.BAD_REQUEST)

    try {
      await this.customerRepo.insert(customerDto)
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async updateCustomer(customerId: number, customerDto: CustomerDto) {
    const existCustomer = await this.customerRepo.findOne(customerId)

    if (!existCustomer) throw new HttpException('Phone number already exist', HttpStatus.NOT_FOUND)

    if (existCustomer.phoneNumber !== customerDto.phoneNumber) {
      const hasPhoneNumber = await this.customerRepo.hasPhoneNumber(customerDto.phoneNumber)
      if (hasPhoneNumber) throw new HttpException('Phone number already exist', HttpStatus.BAD_REQUEST)
    }

    try {
      await this.customerRepo.update(customerId, {
        fullName: customerDto.fullName || existCustomer.fullName,
        dob: customerDto.dob || existCustomer.dob,
        phoneNumber: customerDto.phoneNumber || existCustomer.phoneNumber,
        address: customerDto.address || existCustomer.address,
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
