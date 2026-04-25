import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class AddMoneyDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class DeductMoneyDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}
