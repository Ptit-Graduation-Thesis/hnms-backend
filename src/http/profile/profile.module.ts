import { RepositoryModule } from '@/repository'
import { Module } from '@nestjs/common'

import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'
import { ProfileValidate } from './profile.validate'

@Module({
  imports: [RepositoryModule],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileValidate],
})
export class ProfileModule {}
