import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
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
  credentialId: string

  @ApiProperty()
  dob: Date

  @ApiProperty()
  salary: number

  @ApiProperty()
  status: number

  @ApiProperty()
  roleId: number

  @ApiProperty()
  branchId: number
}
