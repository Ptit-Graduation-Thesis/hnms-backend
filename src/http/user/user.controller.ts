import { Controller, Get, HttpCode, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { UserService } from './user.service'
import { UserValidate } from './user.validate'

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly userValidate: UserValidate) {}

  @Get('/search')
  @HttpCode(200)
  async searchUser(@Query('keyword') keyword = '', @Query('limit') limit = 10, @Query('page') page = 1) {
    await this.userValidate.searchUser({ keyword, limit, page })

    return this.userService.searchUser(keyword, limit, page)
  }
}
