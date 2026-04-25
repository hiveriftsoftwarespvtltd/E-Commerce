
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDetailDocument = ProductDetail & Document;

@Schema({ timestamps: true })
export class ProductDetail {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  sku!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  salesPrice!: number;

  @Prop({ required: true })
  stock!: number;

  // @Prop({ type: Types.ObjectId, ref: 'Subcategory', required: true })
  // subcategory!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category!:Types.ObjectId
    

  @Prop({ type: [String], default: [] })
  imageUrls!: string[];

  @Prop({ default: 'active' })
  status!: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
