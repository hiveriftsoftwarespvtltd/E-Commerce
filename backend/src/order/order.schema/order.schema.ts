// // src/order/order.schema/order.schema.ts
// import { Schema, Document, Types } from 'mongoose';

// export const OrderSchema = new Schema(
//   {
//     orderNumber: { type: String, unique: true, required: true },

//     userId: { type: Types.ObjectId, ref: 'User', required: true },

//     items: [
//       {
//         productName: { type: String, required: true },
//         productImage: { type: String, required: true },
//         sku: { type: String },
//         quantity: { type: Number, default: 1, required: true },
//         price: { type: Number, required: true },
//       },
//     ],

//     subtotal: { type: Number, required: true },
//     shipping: { type: Number, default: 10.0 },
//     tax: { type: Number, default: 0 },
//     totalAmount: { type: Number, required: true },

//     shippingAddress: {
//       street: { type: String, required: true },
//       apartment: { type: String },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       zipCode: { type: String, required: true },
//       country: { type: String, default: 'United States' },
//     },

//     paymentMethod: {
//       type: String,
//       enum: ['Credit Card', 'PayPal', 'Razorpay', 'COD'],
//       required: true,
//     },

//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'paid', 'failed', 'refunded'],
//       default: 'pending',
//     },

//     transactionId: { type: String },

//     status: {
//       type: String,
//       enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
//       default: 'pending',
//     },

//     trackingNumber: { type: String },

//     userLocation: {
//       type: { type: String, enum: ['Point'], default: 'Point' },
//       coordinates: { type: [Number], required: true },
//     },

//     razorpayOrderId: { type: String },
//     razorpayPaymentId: { type: String },
//     razorpaySignature: { type: String },
//   },
//   { timestamps: true }
// );

// OrderSchema.index({ userLocation: '2dsphere' });
// OrderSchema.index({ orderNumber: 1 });
// OrderSchema.index({ createdAt: -1 });
// OrderSchema.index({ status: 1 });
// OrderSchema.index({ paymentStatus: 1 });

// export interface Order extends Document {
//   orderNumber: string;
//   userId: Types.ObjectId;
//   items: any[];
//   subtotal: number;
//   shipping: number;
//   tax: number;
//   totalAmount: number;
//   shippingAddress: any;
//   paymentMethod: string;
//   paymentStatus: string;
//   transactionId?: string;
//   status: string;
//   trackingNumber?: string;
//   userLocation: { type: 'Point'; coordinates: [number, number] };
//   razorpayOrderId?: string;
//   razorpayPaymentId?: string;
//   razorpaySignature?: string;
// }


import { Schema, Document, Types } from 'mongoose';


export type OrderDocument = Order & Document;

export class Order {
  orderNumber!: string;
  totalAmount!: number;
  paymentStatus!: string;
  status!: string;
}
export const OrderSchema = new Schema(
  {
    orderNumber: { type: String, unique: true, required: true },

    user: { type: Types.ObjectId, ref: 'User', required: true },

    items: [
      {
        productId: { type: Types.ObjectId, ref: 'ProductDetail' }, // ✅ add this
        productName: { type: String, required: true },
        productImage: { type: String },
        sku: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],

    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    shippingAddress: {
      street: String,
      apartment: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: 'India' },
    },

    paymentMethod: {
      type: String,
      enum: ['COD', 'RAZORPAY', 'STRIPE', 'UPI'],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },

    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    contact:{
      email:String,
      phone:String
    },

    trackingNumber: String,

    // optional geo
    userLocation: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number],
    },
  },
  { timestamps: true }
);