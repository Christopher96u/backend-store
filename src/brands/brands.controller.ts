import { Controller, Get } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands() {
    return 'This action returns all brands';
  }
}
