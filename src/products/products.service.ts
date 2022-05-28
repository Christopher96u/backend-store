import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  private counterId = 2;
  private products = [
    {
      id: 1,
      name: 'Product 1',
      price: 192,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 205,
    },
  ];
  findAll() {
    return this.products;
  }
  findOne(id: number) {
    const result = this.products.find((product) => product.id == id);
    if (!result) {
      throw new HttpException(
        `Product with id #${id} Not Found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }
  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
