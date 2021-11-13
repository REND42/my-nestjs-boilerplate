import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ExcludeNullInterceptor } from './utils/excludeNull.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(
  //   app.get(Reflector)
  // ))
  app.useGlobalInterceptors(new ExcludeNullInterceptor())
  app.use(cookieParser())

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
  await app.listen(port, () => {
    Logger.log(`Running in ${config.get('environment')}, port: ${port}`)
  })
}
bootstrap()