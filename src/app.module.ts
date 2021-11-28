import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { DatabaseModule } from '@/database'
import { RepositoryModule } from '@/repository'
import { JwtModule } from '@/jwt'
import { BullModule } from '@/bull'
import { AppGateway } from '@/gateways'
import { SuggestModule } from '@/http/suggest'
import { AuthModule } from '@/http/auth'
import { ProfileModule } from '@/http/profile'
import { UserModule } from '@/http/user'
import { RoomModule } from '@/http/room'
import { BranchModule } from '@/http/barnch'
import { ItemModule } from '@/http/item'
import { CustomerModule } from '@/http/customer'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RepositoryModule,
    JwtModule,
    BullModule,
    SuggestModule,
    AuthModule,
    ProfileModule,
    UserModule,
    RoomModule,
    BranchModule,
    ItemModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
