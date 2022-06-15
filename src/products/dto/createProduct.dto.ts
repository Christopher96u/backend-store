import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  readonly name: string;

  @IsString()
  @MaxLength(255)
  @MinLength(5)
  readonly description: string;

  // Price in cents
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  readonly stock: number;

  @IsUrl()
  @IsString()
  @IsOptional()
  readonly imageUrl?: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly categoryId: number;
}
