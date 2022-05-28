import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getCategories(): string {
    return 'This action returns all categories';
  }
}
