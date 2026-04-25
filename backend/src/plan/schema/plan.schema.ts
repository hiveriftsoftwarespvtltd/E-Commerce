import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Plan extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  planDays: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, enum: ['Stove', 'Oven', 'Mixer', 'Fridge', 'Other'] })
  plan: string; // Kitchen items

  @Prop({ required: true, default: 'permanent' })
  userType: string;

  @Prop({ required: true, enum: ['Golden', 'Silver'] })
  planType: string;

  @Prop({ required: true })
  OfferPrice: number;

  @Prop()
  webImage: string;

  @Prop()
  appImage: string;

  @Prop({ type: Types.ObjectId, ref: 'SubCategory', required: false })
  subCategoryId?: Types.ObjectId;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
