import { IsNotEmpty, IsEnum } from 'class-validator';
import { OrderStatus } from './store.dto'; // ✅ Import OrderStatus

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
