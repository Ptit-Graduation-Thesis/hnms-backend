import { ApiProperty } from '@nestjs/swagger'

export class ItemDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  des: string

  @ApiProperty()
  price: number

  @ApiProperty({ type: 'string', format: 'binary' })
  picture: Express.Multer.File

  @ApiProperty()
  type: number
}
