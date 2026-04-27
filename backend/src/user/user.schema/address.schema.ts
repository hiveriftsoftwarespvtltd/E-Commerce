// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// @Schema({ timestamps: true })
// export class Address extends Document {
//   @Prop({ required: true }) address!: string;
//   @Prop({ required: true }) userName!: string;
//   @Prop({ required: true }) landmark!: string;
//   @Prop({ required: true }) alternatePhone!: string;

//   @Prop({
//     type: { type: String, enum: ['Point'], default: 'Point' },
//     coordinates: { type: [String], required: true },
//   })
//   location!: { type: string; coordinates: string[] };

//   @Prop({ required: true }) userId!: string;
// }

// export const AddressSchema = SchemaFactory.createForClass(Address);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Address extends Document {
  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ required: true })
  line1!: string;

  @Prop()
  line2?: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // ✅ must be number
      default: [0, 0],
    },
  })
  location!: {
    type: string;
    coordinates: number[];
  };

  @Prop({ required: true })
  phone1!: string;

  @Prop()
  phone2?: string;

  @Prop()
  landmark?: string;

  @Prop({ required: true })
  pincode!: string;

  @Prop({ required: true })
  city!: string;

  @Prop({ required: true })
  state!: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);