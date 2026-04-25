// src/order/dto/create-order.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  productId!: string; // ✅ added

  @IsString()
  productName!: string;

  @IsString()
  productImage!: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  price!: number;
}

export class CreateOrderDto {
  @IsString() @IsNotEmpty() userId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @IsNumber() subtotal!: number;
  @IsOptional() @IsNumber() shipping?: number;
  @IsOptional() @IsNumber() tax?: number;
  @IsNumber() totalAmount!: number;

  @IsString() @IsNotEmpty() paymentMethod!: string;

  @IsNotEmpty()
  shippingAddress!: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };

  @IsString() @IsNotEmpty() userLongitude!: string;
  @IsString() @IsNotEmpty() userLatitude!: string;
}