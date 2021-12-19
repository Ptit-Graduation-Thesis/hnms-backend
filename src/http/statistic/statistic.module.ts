import { Module } from '@nestjs/common'

import { RepositoryModule } from '@/repository'
import { StatisticController } from './statistic.controller'
import { StatisticService } from './statistic.service'
import { StatisticValidate } from './statistic.validate'

@Module({
  imports: [RepositoryModule],
  controllers: [StatisticController],
  providers: [StatisticService, StatisticValidate],
})
export class StatisticModule {}
