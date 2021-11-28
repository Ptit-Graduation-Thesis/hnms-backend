import { ApiProperty } from '@nestjs/swagger'

export class SellItemDto {
  @ApiProperty()
  customerId: number
  items: { itemId: number; amount: number }[]
}
