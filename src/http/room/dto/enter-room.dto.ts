import { ApiProperty } from '@nestjs/swagger'

export class EnterRoomDto {
  @ApiProperty()
  userTwoId: number
}
