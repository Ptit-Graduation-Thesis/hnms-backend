import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserRepository } from './user.repository'
import { RoleRepository } from './role.repository'
import { RoomRepository } from './room.repository'
import { BranchRepository } from './branch.repository'
import { MessageRepository } from './message.repository'
import { CustomerRepository } from './customer.reporitory'
import { ItemRepository } from './item.repository'
import { BranchItemRepository } from './branch-item.repository'
import { SaleBillRepository } from './sale-bill.repository'
import { SoldItemRepository } from './sold-item.repository'
import { ImportBillRepository } from './import-bill.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      RoomRepository,
      BranchRepository,
      MessageRepository,
      CustomerRepository,
      ItemRepository,
      BranchItemRepository,
      SaleBillRepository,
      SoldItemRepository,
      ImportBillRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
