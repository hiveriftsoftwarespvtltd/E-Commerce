import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDetailDto } from './create-product-detail.dto';
import { IsOptional, IsArray, IsString } from 'class-validator';

export class UpdateProductDetailDto extends PartialType(CreateProductDetailDto) {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];
}
