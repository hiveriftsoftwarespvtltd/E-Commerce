import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  @IsIn(['COD', 'RAZORPAY', 'STRIPE', 'UPI'])
  paymentMethod!: string;

  @IsOptional()
  @IsString()
  gateway?: string; // razorpay

  @IsOptional()
  @IsString()
  gatewayOrderId?: string;

  @IsOptional()
  @IsString()
  gatewayTransactionId?: string;

  @IsOptional()
  @IsString()
  signature?: string;
}



export class VerifyPaymentDto {
  @IsString()
  razorpay_order_id!: string;

  @IsString()
  razorpay_payment_id!: string;

  @IsString()
  razorpay_signature!: string;
}