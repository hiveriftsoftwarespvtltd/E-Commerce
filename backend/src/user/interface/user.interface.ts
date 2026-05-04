import { Document } from 'mongoose';

// User document interface (for TypeScript type safety)
export interface User extends Document {
  userName: string;
  userType: string;
  userAvatarUrl: string;
  userEmail: string;
  userAddress: string;
  userPhone: string;
  alternatePhone: string;
  userAge: number;
  loginType: string;
  userPassword: string;
  otp?: string | null;
  otpExpiration?: Date | null; // Assuming password will be a string
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  role: 'user' | 'admin';
  location: {
    type: 'Point';
    coordinates: [string, string];
  };
}
