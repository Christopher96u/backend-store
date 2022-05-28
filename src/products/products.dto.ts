import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
