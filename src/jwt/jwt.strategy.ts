import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'

import { UserPayloadType } from '@/types/auth.type'
import { UserRepository } from '@/repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepo: UserRepository, protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_JWT_KEY'),
    })
  }

  async validate(payload: UserPayloadType) {
    const { id: userId } = payload

    const user = this.userRepo.findOne(userId, { relations: ['role', 'branch'] })

    if (!user) throw new UnauthorizedException()

    return user
  }
}
