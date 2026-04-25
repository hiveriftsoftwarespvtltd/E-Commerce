import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/profile.schema';
import * as bcrypt from 'bcrypt';
import { fileUpload } from 'src/util/fileupload';
import { Console } from 'console';

@Injectable()
export class ProfileService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'Profile fetched successfully',
      data: user,
    };
  }

  async updateProfile(userId: string, updateDto: any, file?: Express.Multer.File) {
    const updateData: any = {};
    console.log("UPDATE KAR DE ",file);
 console.log(updateData,"ujhbububuybubuubuhbuu")
    if (updateDto.fullName) updateData.fullName = updateDto.fullName;
    if (updateDto.email) updateData.email = updateDto.email;
    if (updateDto.phone) updateData.phone = updateDto.phone;
    if (updateDto.username) updateData.userName = updateDto.username;
    if (updateDto.userPhone) updateData.userPhone = updateDto.userPhone;

    if (file) {
      const fileName = await fileUpload('profile', file);
      updateData.profileImage = `${process.env.SERVER_BASE_URL}uploads/profile/${fileName}`;
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('No data provided for update');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, { $set: updateData }, { new: true })
      .select('-password');
   
    if (!updatedUser) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    };
  }

  async changePassword(userId: string, dto: any) {
    const { oldPassword, newPassword, confirmPassword } = dto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('New password and confirm password do not match');
    }

    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (!user.password) {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      return { success: true, message: 'Password set successfully' };
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('Old password is incorrect');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { success: true, message: 'Password changed successfully' };
  }
}
