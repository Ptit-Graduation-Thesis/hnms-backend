import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { Roles } from '@/decorator'
import { RoleStatus } from '@/enums'
import { UserService } from './user.service'
import { UserValidate } from './user.validate'
import { UserDto } from './dto'

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly userValidate: UserValidate) {}

  @Get()
  @Roles(RoleStatus.ADMIN)
  @HttpCode(200)
  async getUsers(@Query('limit') limit = 10, @Query('page') page = 1) {
    await this.userValidate.getUsers({ limit, page })

    return this.userService.getUsers(limit, page)
  }

  @Get('/:userId')
  @Roles(RoleStatus.ADMIN)
  @HttpCode(200)
  async getUser(@Param('userId') userId: number) {
    await this.userValidate.getUser({ userId })

    return this.userService.getUser(userId)
  }

  @Get('/search')
  @HttpCode(200)
  async searchUser(@Query('keyword') keyword = '', @Query('limit') limit = 10, @Query('page') page = 1) {
    await this.userValidate.searchUser({ keyword, limit, page })

    return this.userService.searchUser(keyword, limit, page)
  }

  @Post()
  @Roles(RoleStatus.ADMIN)
  @HttpCode(201)
  async createUser(@Body() userDto: UserDto) {
    await this.userValidate.createUser(userDto)

    await this.userService.createUser(userDto)
  }

  @Put('/:userId')
  @Roles(RoleStatus.ADMIN)
  @HttpCode(204)
  async updateUser(@Body() userDto: UserDto, @Param('userId') userId: number) {
    await this.userValidate.updateUser(userDto)

    await this.userService.updateUser(userId, userDto)
  }
}
