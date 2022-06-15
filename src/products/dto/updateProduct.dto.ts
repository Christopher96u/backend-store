import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty } from 'class-validator';

import { CreateProductDto } from './createProduct.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;
}
