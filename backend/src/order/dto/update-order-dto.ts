// src/order/dto/update-order-status.dto.ts
import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsOptional()
  @IsIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsString()
  trackingNumber?: string;
}