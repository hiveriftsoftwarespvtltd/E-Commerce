import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: false })
  web_image?: string[];

  @Prop({ type: [String], required: false })
  app_image?: string[];

  @Prop()
  offer?: string;

  @Prop({ required: true })
  slug: string;

  @Prop()
  meta_title?: string;

  @Prop()
  meta_description?: string;

  @Prop({ default: false })
  is_published: boolean;

  @Prop()
  categoryType?: string;

  @Prop({ default: 0 })
  averageRating: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
