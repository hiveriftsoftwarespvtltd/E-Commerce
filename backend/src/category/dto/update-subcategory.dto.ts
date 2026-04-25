import { Type } from 'class-transformer';
import { IsString, IsOptional, IsMongoId, IsArray, ValidateNested } from 'class-validator';

class LaundryItemDTO {
  itemName: string;
  count: number;
  price: number;
  web_image: string;
  app_image: string;
}

export class UpdateSubcategoryDto {
  @IsString()
  @IsOptional( )
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsOptional()
  category?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  categoryType?: string;

  @IsString()
  @IsOptional()
  app_image?: string[];

  @IsString()
  @IsOptional()
  web_image?: string[];

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => LaundryItemDTO)
  // laundryItems?: LaundryItemDTO[];
}
