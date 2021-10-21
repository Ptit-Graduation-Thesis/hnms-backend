import { RepositoryModule } from './../../repository/repository.module'
import { Module } from '@nestjs/common'

import { AuthController } from '@/http/auth/auth.controller'
import { AuthService } from '@/http/auth/auth.service'
import { AuthValidate } from '@/http/auth/auth.validate'

@Module({
  imports: [RepositoryModule],
  controllers: [AuthController],
  providers: [AuthService, AuthValidate],
})
export class AuthModule {}
