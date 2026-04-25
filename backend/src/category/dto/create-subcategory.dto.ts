import { IsArray, IsOptional, IsString, IsBoolean, IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LaundryItemDTO {
  @IsString()
  itemName: string;

  @IsString()
  count: string;

  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  web_image?: string;

  @IsOptional()
  @IsString()
  app_image?: string;
}

export class CreateSubcategoryDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsArray()
  web_image?: string[];

  @IsOptional()
  @IsArray()
  app_image?: string[];

  @IsOptional()
  price?: number;

  @IsOptional()
  rating?: number;

  @IsOptional()
  @IsString()
  offer?: string;

  @IsMongoId()
  categoryId: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_published?: boolean;

  @IsOptional()
  @IsString()
  userType?: 'daily' | 'permanent';

  @IsOptional()
  @IsString()
  serviceType?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LaundryItemDTO)
  laundryItems?: LaundryItemDTO[];
}

export class UpdateSubcategoryDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsArray()
  web_image?: string[];

  @IsOptional()
  @IsArray()
  app_image?: string[];

  @IsOptional()
  price?: number;

  @IsOptional()
  rating?: number;

  @IsOptional()
  @IsString()
  offer?: string;

  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_published?: boolean;

  @IsOptional()
  @IsString()
  categoryType?: string;

  @IsOptional()
  @IsString()
  userType?: 'daily' | 'permanent';

  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => LaundryItemDTO)
  // laundryItems?: LaundryItemDTO[];
}
