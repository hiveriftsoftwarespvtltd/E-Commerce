// dto/update-banner.dto.ts
import { IsString, IsOptional, IsUrl, IsIn } from 'class-validator';

export class UpdateBannerDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  linkUrl?: string;

  @IsString()
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;
}