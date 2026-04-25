import { IsNotEmpty, IsOptional, IsString, IsNumber, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class PlanDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  planDays: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @IsString()
  plan: string; // Stove, Oven, Mixer, Fridge, Other

  @IsNotEmpty()
  @IsString()
  userType: string; // permanent or temporary

  @IsNotEmpty()
  @IsString()
  planType: string; // Golden or Silver

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  OfferPrice: number;

  @IsOptional()
  @IsString()
  webImage?: string;

  @IsOptional()
  @IsString()
  appImage?: string;

  @IsOptional()
  @IsMongoId()
  subCategoryId?: string;
}
