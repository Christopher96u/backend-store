import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { DeleteResult, Repository } from 'typeorm';

import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}
  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    return product;
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoriesService.findOne(
      createProductDto.categoryId,
    );
    const newProduct = this.productRepository.create(createProductDto);
    newProduct.category = category;
    const response = this.productRepository
      .save(newProduct)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new BadRequestException(`${error.message || 'Unexpected Error'}`);
      });
    return response;
  }
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const currentProduct = await this.productRepository.findOne(id);
    if (updateProductDto.categoryId) {
      const category = await this.categoriesService.findOne(
        updateProductDto.categoryId,
      );
      currentProduct.category = category;
    }
    this.productRepository.merge(currentProduct, updateProductDto);
    return this.productRepository.save(currentProduct);
  }
  async remove(id: number): Promise<DeleteResult> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    return this.productRepository.delete(id);
  }
}
