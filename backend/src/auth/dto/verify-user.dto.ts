import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailOtpDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  otp!: string;
}