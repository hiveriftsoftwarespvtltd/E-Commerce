import { IsString, IsEmail } from 'class-validator';

export class AdminLoginDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  userPassword: string;
}
