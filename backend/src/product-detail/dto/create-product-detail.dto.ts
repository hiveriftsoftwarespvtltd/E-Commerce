import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDetailDto {
  @IsString()
  name!: string;

  @IsString()
  sku!: string;

  @IsString()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  price!: number;

  @Type(() => Number)
  @IsNumber()
  salesPrice!: number;

  @Type(() => Number)
  @IsNumber()
  stock!: number;

  // @IsString()
  // subcategoryId!: string;

  @IsString()
  categoryId!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];
}