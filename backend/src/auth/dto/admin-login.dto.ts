import { IsString, IsEmail } from 'class-validator';

export class AdminLoginDto {
  @IsString()
  userName!:string;

  @IsEmail()
  userEmail!: string;

  @IsString()
  userPassword!: string;
}
