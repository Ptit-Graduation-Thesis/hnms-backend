import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { Public } from '@/decorator'
import { AuthService } from '@/http/auth/auth.service'
import { AuthValidate } from '@/http/auth/auth.validate'
import { LoginDto } from '@/http/auth/dto'

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly authValidate: AuthValidate) {}

  @Public()
  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    await this.authValidate.login(loginDto)
    return await this.authService.login(loginDto)
  }
}
