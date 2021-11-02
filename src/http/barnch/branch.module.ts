import { RepositoryModule } from '@/repository'
import { Module } from '@nestjs/common'

import { BranchController } from './branch.controller'
import { BranchService } from './branch.service'
import { BranchValidate } from './branch.validate'

@Module({
  imports: [RepositoryModule],
  controllers: [BranchController],
  providers: [BranchService, BranchValidate],
})
export class BranchModule {}
