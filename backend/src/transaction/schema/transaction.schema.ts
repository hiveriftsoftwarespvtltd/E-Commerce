// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// @Schema({ timestamps: true })
// export class Transaction extends Document {
//   @Prop({ required: true })
//   userId: string;

//   @Prop({ required: true })
//   amount: number;

//   @Prop({ required: true, enum: ['credit', 'debit'] })
//   type: 'credit' | 'debit';
// }

// export const TransactionSchema = SchemaFactory.createForClass(Transaction);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order!: Types.ObjectId;

  @Prop({ required: true })
  amount!: number;

  @Prop({ default: 'INR' })
  currency!: string;

  @Prop({
    enum: ['COD', 'RAZORPAY', 'STRIPE', 'UPI'],
    required: true,
  })
  paymentMethod!: string;

  @Prop()
  gateway!: string; // razorpay, stripe

  @Prop()
  transactionId!: string; // internal

  @Prop()
  gatewayTransactionId!: string; // razorpay_payment_id

  @Prop()
  gatewayOrderId!: string; // razorpay_order_id

  @Prop()
  signature!: string;

  @Prop({
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'REFUNDED'],
    default: 'PENDING',
  })
  status!: string;

  @Prop()
  failureReason?: string;

  @Prop()
  paidAt?: Date;

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);