import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { User } from '@/decorator'
import { ProfileService } from './profile.service'
import { ProfileValidate } from './profile.validate'
import { User as UserEntity } from '@/entities'
import { ProfileDto } from './dto'

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService, private readonly profileValidate: ProfileValidate) {}

  @Get()
  @HttpCode(200)
  getProfile(@User() user: UserEntity) {
    return user
  }

  @Put()
  @HttpCode(200)
  async updateProfile(@User('id') userId: number, @Body() profileDto: ProfileDto) {
    await this.profileValidate.updateProfile(profileDto)

    return await this.profileService.updateProfile(userId, profileDto)
  }
}
