import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    userName: { type: String },
    userType: { type: String },
    userEmail: { 
      type: String, 
      unique: true,     
      sparse: true,        
      trim: true,
      lowercase: true,
    },
    userAvatarUrl:{type:String},
    userAddress: { type: String },
    userPhone: { type: String },
    alternatePhone: { type: String },
    userAge: { type: Number },
    loginType: { type: String },
    userPassword: { type: String },
    otpExpiration: { type: Date,default:null },
    otp: { type: String,default:null },
    role: { type: String, default: 'user' },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [String], default: ['0', '0'] }, 
    },
    profileImage:{type:String},
    isActive:{type:Boolean,default:true},
    resetToken:{type:String},
    resetTokenExpiry:{type:Date}
  },
  { timestamps: true },
);
