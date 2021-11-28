import { ApiProperty } from '@nestjs/swagger'

export class ImportItemDto {
  @ApiProperty()
  items: { itemId: number; amount: number; importPrice: number }[]
}
