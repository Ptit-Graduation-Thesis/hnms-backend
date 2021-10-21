import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
  .setTitle('HNMS nestjs document')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('HNMS')
  .addBearerAuth()
  .build()
