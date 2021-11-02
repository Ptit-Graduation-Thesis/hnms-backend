import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { BranchService } from './branch.service'
import { BranchValidate } from './branch.validate'

@ApiTags('branch')
@ApiBearerAuth()
@Controller('branchs')
export class BranchController {
  constructor(private readonly branchService: BranchService, private readonly branchValidate: BranchValidate) {}
}
