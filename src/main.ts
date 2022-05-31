import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      // remove fields that are not defined in the class (our DTOs)
      whitelist: true,
      //transform: true
    }),
  );
  await app.listen(configService.get('PORT'));
}
bootstrap();
