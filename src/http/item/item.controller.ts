import { Roles } from '@/decorator'
import { RoleStatus } from '@/enums'
import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'

import { ItemService } from './item.service'
import { ItemValidate } from './item.validate'
import { ItemDto } from './dto'

@ApiTags('Item')
@ApiBearerAuth()
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService, private readonly itemValidate: ItemValidate) {}

  @Get()
  @HttpCode(200)
  async getItems(
    @Query('keyword') keyword = '',
    @Query('type') type: number,
    @Query('limit') limit = 10,
    @Query('page') page = 1,
  ) {
    await this.itemValidate.getItems({ keyword, type, limit, page })

    return this.itemService.getItems(keyword, type, limit, page)
  }

  @Post()
  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  @Roles(RoleStatus.ADMIN, RoleStatus.ACCOUNTANT)
  @UseInterceptors(FileInterceptor('picture'))
  async createItem(@UploadedFile() picture: Express.Multer.File, @Body() itemDto: ItemDto) {
    itemDto.picture = picture
    await this.itemValidate.createItem(itemDto)

    await this.itemService.createItem(itemDto)
  }

  @Put('/:itemId')
  @HttpCode(204)
  @ApiConsumes('multipart/form-data')
  @Roles(RoleStatus.ADMIN, RoleStatus.ACCOUNTANT)
  @UseInterceptors(FileInterceptor('picture'))
  async updateItem(
    @UploadedFile() picture: Express.Multer.File,
    @Body() itemDto: ItemDto,
    @Param('itemId') itemId: number,
  ) {
    itemDto.picture = picture
    await this.itemValidate.updateItem(itemId, itemDto)

    await this.itemService.updateItem(itemId, itemDto)
  }
}