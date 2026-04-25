import { Schema, Document } from 'mongoose';

export const SubItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  slug: { type: String, required: true, unique: true },   
  imageUrl: { type: String, required: false },  
});

export interface SubItem extends Document {
  name: string;
  description?: string;
  price: number;
  slug: string;
  imageUrl?: string;
}

export const MenuItemSchema = new Schema({
  menuName: { type: String, required: true, enum: ['laundry', 'KITCHEN'] },
  slug: { type: String, required: true, unique: true }, 
  subItems: [SubItemSchema]
});

export interface MenuItem extends Document {
  menuName: string;
  slug: string;
  subItems: SubItem[];
}
