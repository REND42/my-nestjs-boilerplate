import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const swaggerConf = new DocumentBuilder().setTitle('Nest App Example')
    .setDescription('The nest api description')
    .setVersion('1.0.0')
    // .addBearerAuth({
    //   type: 'http', scheme: 'bearer', bearerFormat: 'Token'
    // }, 'access-token')
    .addCookieAuth('Authentication', {
      type: 'http',
      in: 'Header',
      scheme: 'Bearer'
    })
    .addTag('nest app')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConf)
  SwaggerModule.setup('doc', app, document)

  const config = app.get(ConfigService)
  const port = process.env.PORT || 3000
  app.use(cookieParser())
  await app.listen(port, () => {
    Logger.log(`Running in ${config.get('environment')}, port: ${port}`)
  })
}
bootstrap()