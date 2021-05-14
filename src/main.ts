// core
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as config from 'config';

// modules
import { AppModule } from './app.module';

async function bootstrap() {
  // server config
  const serverConfig = config.get('server');

  // logger
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  // add global api prefix
  app.setGlobalPrefix('api/v1');

  // swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NLS API')
    .setDescription(
      'API for NIBM Lecturer System - Bloodline behind NLS-PWA 💪',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  logger.log(`Application listening on port: ${port}`);
}
bootstrap();
