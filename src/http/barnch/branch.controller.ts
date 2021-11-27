import { Roles } from '@/decorator'
import { RoleStatus } from '@/enums'
import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { BranchService } from './branch.service'
import { BranchValidate } from './branch.validate'
import { BranchDto } from './dto'

@ApiTags('Branch')
@ApiBearerAuth()
@Controller('branchs')
export class BranchController {
  constructor(private readonly branchService: BranchService, private readonly branchValidate: BranchValidate) {}

  @Get()
  @Roles(RoleStatus.ADMIN)
  @HttpCode(200)
  async getBranchs(@Query('keyword') keyword = '', @Query('limit') limit = 10, @Query('page') page = 1) {
    await this.branchValidate.getbranchs({ keyword, limit, page })

    return this.branchService.getBranchs(keyword, limit, page)
  }

  @Post()
  @Roles(RoleStatus.ADMIN)
  @HttpCode(201)
  async createBranch(@Body() branchDto: BranchDto) {
    await this.branchValidate.createBranch(branchDto)

    await this.branchService.createBranch(branchDto)
  }

  @Put('/:branchId')
  @Roles(RoleStatus.ADMIN)
  @HttpCode(204)
  async updateBranch(@Param('branchId') branchId: number, @Body() branchDto: BranchDto) {
    await this.branchValidate.updateBranch(branchId, branchDto)

    await this.branchService.updateBranch(branchId, branchDto)
  }
}
