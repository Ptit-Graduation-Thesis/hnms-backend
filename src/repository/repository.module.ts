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
import { BillRepository } from './bill.repository'
import { SoldItemRepository } from './sold-item.repository'

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
      BillRepository,
      SoldItemRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
