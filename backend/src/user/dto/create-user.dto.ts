import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  userType: string;

  @IsString()
  @IsNotEmpty()
  alternatePhone: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  userPhone: string;

  @IsNumber()
  @Min(1)
  @Max(120)
  @IsNotEmpty()
  userAge: number;

  @IsString()
  @IsNotEmpty()
  loginType: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  userPassword: string;

  @IsEnum(['user', 'admin'])
  @IsNotEmpty()
  role: 'user' | 'admin';

  @IsOptional()
  otpExpiration?: Date;
}
