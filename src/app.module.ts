import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { DatabaseModule } from '@/database'
import { BullModule } from '@/bull'
import { AppGateway } from '@/gateways'
import { JwtModule } from '@/jwt'
import { AuthModule } from '@/http/auth'
import { UserModule } from '@/http/user'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, JwtModule, BullModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
