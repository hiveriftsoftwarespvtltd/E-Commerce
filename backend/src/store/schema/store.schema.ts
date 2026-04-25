import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { OrderStatus } from '../dto/store.dto';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true })
export class Store {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  orderId?: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userPhone: string;

  @Prop()
  webImage?: string;

  @Prop()
  appImage?: string;

  @Prop({ required: true })
  customerAddress: string;

  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, enum: OrderStatus })
  status: OrderStatus;

  @Prop({ required: true })
  orderNumber: string; // changed to string

  @Prop({ required: true })
  finalAmount: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
