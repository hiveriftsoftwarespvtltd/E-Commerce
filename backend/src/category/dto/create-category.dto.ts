import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  web_image?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  app_image?: string[];

  @IsOptional()
  @IsString()
  offer?: string;

  @IsOptional()
  @IsString()
  meta_title?: string;

  @IsOptional()
  @IsString()
  meta_description?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true) // FIX
  @IsBoolean()
  is_published?: boolean;

  @IsOptional()
  @IsString()
  categoryType?: string;
}

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  web_image?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  app_image?: string[];

  @IsOptional()
  @IsString()
  offer?: string;

  @IsOptional()
  @IsString()
  meta_title?: string;

  @IsOptional()
  @IsString()
  meta_description?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true) 
  @IsBoolean()
  is_published?: boolean;

  @IsOptional()
  @IsString()
  categoryType?: string;
}
