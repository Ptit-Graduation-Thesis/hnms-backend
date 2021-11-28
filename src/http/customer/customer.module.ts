import { RepositoryModule } from '@/repository'
import { Module } from '@nestjs/common'

import { CustomerController } from './customer.controller'
import { CustomerService } from './customer.service'
import { CustomerValidate } from './customer.validate'

@Module({
  imports: [RepositoryModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerValidate],
})
export class CustomerModule {}
