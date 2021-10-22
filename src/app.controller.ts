import { Controller, Get, HttpCode, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AppService } from '@/app.service'
import { Public } from '@/decorator'

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Public()
  @Post('/initial-database')
  @HttpCode(201)
  initialDatabase() {
    return this.appService.initialDatabase()
  }
}
