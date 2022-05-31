import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from './entities/category.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id #${id} not found`);
    }
    return category;
  }
  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    const response = this.categoryRepository
      .save(newCategory)
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
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    //
    const currentCategory = await this.categoryRepository.findOne(id);
    this.categoryRepository.merge(currentCategory, updateCategoryDto);
    return this.categoryRepository.save(currentCategory);
  }
  remove(id: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }
}
