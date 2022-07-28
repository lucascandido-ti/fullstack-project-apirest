import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👍 Conhece CORS
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
