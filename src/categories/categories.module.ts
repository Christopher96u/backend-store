import { CategoriesController } from './categories.controller';
import { Module } from '@nestjs/common';
@Module({
  controllers: [CategoriesController],
})
export class CategoriesModule {}
