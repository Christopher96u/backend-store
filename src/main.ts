import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // remove fields that are not defined in the class (our DTOs)
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
