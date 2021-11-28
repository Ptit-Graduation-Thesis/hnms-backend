import { ApiProperty } from '@nestjs/swagger'

export class CustomerDto {
  @ApiProperty()
  fullName: string

  @ApiProperty()
  dob: Date

  @ApiProperty()
  phoneNumber: string

  @ApiProperty()
  address: string
}
