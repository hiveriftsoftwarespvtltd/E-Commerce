// src/category.schema/sub-category.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubcategoryDocument = Subcategory & Document;

@Schema()
export class Subcategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  slug: string;

  @Prop({ type: [String], default: [] })
  web_image?: string[];

  @Prop({ type: [String], default: [] })
  app_image?: string[];

  @Prop({ default: 0 })
  price: number;

  @Prop({
    type: [
      {
        itemName: String,
        count: String,
        price: String,
      },
    ],
    default: [],
  })
  laundryItems?: { itemName: string; count: string; price: string }[];

  @Prop()
  rating?: number;

  @Prop()
  offer?: string;

  @Prop({ required: true })
  categoryId: string;

  @Prop({ required: true, enum: ['daily', 'permanent'] })
  userType: 'daily' | 'permanent';

  @Prop()
  meta_title?: string;

  @Prop()
  meta_description?: string;

  @Prop()
  is_published?: boolean;

  @Prop()
  categoryType?: string;

  // 🔹 Kitchen Items
  @Prop({
    type: [
      {
        itemName: String,
        price: String,
      },
    ],
    default: [],
  })
  kitchenItems?: { itemName: string; price: string }[];
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
