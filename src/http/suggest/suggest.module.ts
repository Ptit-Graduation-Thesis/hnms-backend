import { Module } from '@nestjs/common'

import { RepositoryModule } from '@/repository'
import { SuggestController } from './suggest.controller'
import { SuggestService } from './suggest.service'
import { SuggestValidate } from './suggest.validate'

@Module({
  imports: [RepositoryModule],
  controllers: [SuggestController],
  providers: [SuggestService, SuggestValidate],
})
export class SuggestModule {}
