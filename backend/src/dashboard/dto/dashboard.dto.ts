import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop()
  orderId!: string;

  @Prop()
  customerName!: string;

  @Prop()
  productName!: string;

  @Prop()
  totalAmount!: number;

  @Prop()
  status!: string; // Pending, Processing, Shipped, Delivered, Completed

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
