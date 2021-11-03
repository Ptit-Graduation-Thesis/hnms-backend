import { ApiProperty } from '@nestjs/swagger'

export class BranchDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  address: string
}
