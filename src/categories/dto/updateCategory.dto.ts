import { CreateCategoryDto } from './createCategory.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsBoolean()
  isActive: boolean;
}
