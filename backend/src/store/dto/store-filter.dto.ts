import { IsOptional, IsString, IsEnum } from 'class-validator';
import { OrderStatus } from './store.dto';

export class StoreFilterDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsString()
  itemName?: string;
}
