// dto/create-banner.dto.ts
import { IsString, IsNotEmpty, IsUrl, IsIn } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  linkUrl: string;

  @IsString()
  @IsIn(['active', 'inactive'])
  status: string;
}