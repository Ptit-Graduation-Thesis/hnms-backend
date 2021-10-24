import { Module } from '@nestjs/common'

import { RepositoryModule } from '@/repository'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserValidate } from './user.validate'

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService, UserValidate],
})
export class UserModule {}
