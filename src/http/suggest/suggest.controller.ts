import { Controller, Get, HttpCode, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { Roles } from '@/decorator'
import { RoleStatus } from '@/enums'
import { SuggestService } from './suggest.service'
import { SuggestValidate } from './suggest.validate'

@ApiTags('Suggest')
@ApiBearerAuth()
@Controller('suggest')
export class SuggestController {
  constructor(private readonly suggestService: SuggestService, private readonly suggestValidate: SuggestValidate) {}

  @Get('/roles')
  @Roles(RoleStatus.ADMIN)
  @HttpCode(200)
  async suggestRoles(@Query('keyword') keyword = '') {
    await this.suggestValidate.suggestParams({ keyword })

    return this.suggestService.suggestRoles(keyword)
  }

  @Get('/branchs')
  @Roles(RoleStatus.ADMIN)
  @HttpCode(200)
  async suggestBranchs(@Query('keyword') keyword = '') {
    await this.suggestValidate.suggestParams({ keyword })

    return this.suggestService.sugegstBranchs(keyword)
  }
}
