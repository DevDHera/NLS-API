// core
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add global api prefix
  app.setGlobalPrefix('api/v1');

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('NLS API')
    .setDescription(
      'API for NIBM Lecturer System - Bloodline behind NLS-PWA 💪',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
