import { Roles } from '@/decorator'
import { RoleStatus } from '@/enums'
import { Controller, Get, HttpCode, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { StatisticService } from './statistic.service'
import { StatisticValidate } from './statistic.validate'

@ApiTags('Statistic')
@ApiBearerAuth()
@Controller('statistics')
export class StatisticController {
  constructor(
    private readonly statisticService: StatisticService,
    private readonly statisticValidate: StatisticValidate,
  ) {}

  @Get('/revenue/month')
  @HttpCode(200)
  @Roles(RoleStatus.ADMIN)
  async getMonthRevenue(@Query('month') month: string) {
    await this.statisticValidate.getMonthRevenue(month)

    return this.statisticService.getMonthRevenue(month)
  }

  @Get('/revenue/year')
  @HttpCode(200)
  @Roles(RoleStatus.ADMIN)
  async getYearRevenue(@Query('year') year: string) {
    await this.statisticValidate.getYearRevenue(year)

    return this.statisticService.getYearRevenue(year)
  }
}
