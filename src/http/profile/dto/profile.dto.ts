import { ApiProperty } from '@nestjs/swagger'

export class ProfileDto {
  @ApiProperty()
  fullName: string

  @ApiProperty()
  username: string

  @ApiProperty()
  password: string

  @ApiProperty()
  confirmPassword: string

  @ApiProperty()
  phoneNumber: string

  @ApiProperty()
  address: string

  @ApiProperty()
  dob: Date
}
