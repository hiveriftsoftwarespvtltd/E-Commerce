import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsEmail()
  userEmail?: string;

  @IsOptional()
  @IsString()
  userPhone?: string;

  // @IsOptional()
  // @IsString()
  // address?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
