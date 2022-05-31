import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  // Module (controller, service )

  @Get()
  getAllProducts(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('brand') brand: string,
  ) {
    /* return {
      message: 'This action returns all products',
      limit: limit,
      ofset: ofset,
      brand: brand,
    }; */
    return this.productsService.findAll();
  }
  @Get(':id')
  getOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    // Just take brand and price as payload
    return this.productsService.create(payload);
  }
  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    /* return {
      message: 'This action update a product',
      id: id,
      data: payload,
    }; */
    return this.productsService.update(id, payload);
  }
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    /* return {
      message: 'This action delete a product',
      id: id,
    }; */
    return this.productsService.remove(id);
  }
}
