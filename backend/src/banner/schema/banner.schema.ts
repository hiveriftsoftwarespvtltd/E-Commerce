// schema/banner.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BannerDocument = Banner & Document;

@Schema({ timestamps: true })
export class Banner {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string; // e.g., Homepage Hero, Offer Banner, etc.

  @Prop({ required: true })
  linkUrl: string;

  @Prop({ required: true, enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ required: true })
  image: string; // Only one image now
}

export const BannerSchema = SchemaFactory.createForClass(Banner);