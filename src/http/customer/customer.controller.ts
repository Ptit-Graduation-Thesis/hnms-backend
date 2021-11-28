import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CustomerService } from './customer.service'
import { CustomerValidate } from './customer.validate'
import { CustomerDto } from './dto'

@ApiTags('Cusomter')
@ApiBearerAuth()
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private readonly customerValidate: CustomerValidate) {}

  @Get()
  @HttpCode(200)
  async getCustomers(@Query('keyword') keyword = '', @Query('limit') limit = 10, @Query('page') page = 1) {
    await this.customerValidate.getCustomers({ keyword, limit, page })

    return this.customerService.getCustomers(keyword, limit, page)
  }

  @Post()
  @HttpCode(201)
  async createCustomer(@Body() customerDto: CustomerDto) {
    await this.customerValidate.createCustomer(customerDto)

    await this.customerService.createCustomer(customerDto)
  }

  @Put('/:customerId')
  @HttpCode(204)
  async updateCustomer(@Param('customerId') customerId: number, @Body() customerDto: CustomerDto) {
    await this.customerValidate.updateCustomer(customerId, customerDto)

    await this.customerService.updateCustomer(customerId, customerDto)
  }
}
