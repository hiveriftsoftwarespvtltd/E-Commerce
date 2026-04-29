import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CustomResponse from 'src/common/providers/custom-response.service';
import CustomError from 'src/common/providers/customer-error.service';
import { throwException } from 'src/util/errorhandling';
import * as bcrypt from 'bcryptjs';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { AddressDto } from './dto/address.dto';
import { Address } from './user.schema/address.schema';
import { AdminLoginDto } from 'src/auth/dto/admin-login.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Order } from 'src/order/order.schema/order.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class UserService {
  constructor(
    private readonly addressService:AddressService,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Address') private addressModel: Model<Address>,
    @InjectModel("Order") private orderModel: Model<Order>,
    @InjectModel("Wishlist") private wishlistModel: Model<any>
  ) {}
  async createAddress(dto: AddressDto) {
    try {
      const address = new this.addressModel({
        address: dto.address,
        userName: dto.userName,
        alternatePhone: dto.alternatePhone,
        landmark: dto.landmark,
        userId: dto.userId,
        location: {
          type: 'Point',
          coordinates: [String(dto.longitude), String(dto.latitude)],
        },
      });

      const result = await address.save();

      return new CustomResponse(200, 'Address created successfully', result);
    } catch (error) {
      throwException(error);
    }
  }

  async getAddress(userId: string) {
    try {
      const address = await this.addressModel.find({ userId });

      if (!address.length) {
        throw new CustomError(404, 'Address not found');
      }

      return new CustomResponse(200, 'Address fetched', address);
    } catch (error) {
      throwException(error);
    }
  }

  async create(createUserDto: AdminLoginDto) {
    try {
      const existing = await this.userModel
        .findOne({ userEmail: createUserDto.userEmail })
        .exec();
      console.log(existing);
      if (existing) throw new ConflictException('Email already exists');

      const hashed = await bcrypt.hash(createUserDto.userPassword, 10);
      console.log('hisa', hashed);
      const user = new this.userModel({
        ...createUserDto,
        userPassword: hashed,
      });
      const saved = await user.save();
      return new CustomResponse(201, 'User created successfully', saved);
    } catch (err) {
      throwException(err);
    }
  }
  async findByEmailUser(userEmail: string) {
    const user = await this.userModel.findOne({ userEmail }).exec();
    return user;
  }
  async updateLocation(
    userId: string,
    longitude: string,
    latitude: string,
    address?: string,
  ) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new CustomError(404, 'User not found');
      }

      user.location = {
        type: 'Point',
        coordinates: [String(longitude), String(latitude)],
      };

      if (address) {
        user.userAddress = address;
      }

      await user.save();

      return new CustomResponse(200, 'Location updated successfully', user);
    } catch (error) {
      throwException(error);
    }
  }

  async updateUserByUserId(userId: string, updateData: Partial<CreateUserDto>) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new CustomError(404, 'User not found');
      }

      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true },
      );

      return new CustomResponse(200, 'User updated successfully', updatedUser);
    } catch (error) {
      throwException(error);
    }
  }

  async findUserById(userId: string) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new CustomError(404, 'User not found');
      }

      return new CustomResponse(200, 'User fetched', user);
    } catch (error) {
      throwException(error);
    }
  }

  async findNearbyUsers(
    longitude: string,
    latitude: string,
    maxDistance = 5000,
  ) {
    try {
      const users = await this.userModel.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [String(longitude), String(latitude)],
            },
            $maxDistance: maxDistance,
          },
        },
      });

      if (!users.length) {
        return new CustomResponse(404, 'No nearby users found');
      }

      return new CustomResponse(200, 'Nearby users found', users);
    } catch (error) {
      throwException(error);
    }
  }

  async uploadProfileImage(userId: string, file: Express.Multer.File) {
  try {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

   const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.SERVER_BASE_URL}/storeforexplore_api/`
    : 'http://localhost:8000/';

    // ✅ DELETE OLD IMAGE (if exists)
    if (user.userAvatarUrl) {
      const oldImagePath = user.userAvatarUrl.split('uploads/')[1];

      if (oldImagePath) {
        const fullPath = path.join('uploads', oldImagePath);

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    }

    const imageUrl = `${baseUrl}uploads/profile/${file.filename}`;

    user.userAvatarUrl = imageUrl;

    await user.save();

    return new CustomResponse(200, 'Profile image updated', {
      profileImage: user.userAvatarUrl,
    });

  } catch (error) {
    throwException(error);
  }
}

async getUserProfile(userId:string){
  try {
    const user = await this.userModel.findById(userId).select("-userPassword")
    
    if(!user){
      throw new CustomError(400,"User not found")
    }
    const [orders, addressResponse] = await Promise.all([
      this.orderModel.find({ user: userId }),
      this.addressService.getUserAddresses(userId), // 👈 CALL SERVICE
    ]);

    return new CustomResponse(200, 'User Profile fetched successfully', {
      user,
      orders,
      addresses: addressResponse.result || [], // ✅ extract result
    });
  } catch (err:any) {
    if (err instanceof CustomError) throw err;
    
    throw new CustomError(500, err.message || 'Failed to get User Profile');
  }
}

async updateUserProfile(userId:string,dto:UpdateUserDto){
  try {
    const user = await this.userModel.findById(userId)
    if(!user){
      throw new CustomError(400,"User not found")
    }

    if(dto.userName) user.userName = dto.userName
    if(dto.userPhone) user.userPhone = dto.userPhone
    user.save()
    return new CustomResponse(200,"User Profile updated successfully")
  } catch (err:any) {
    if (err instanceof CustomError) throw err;
    
    throw new CustomError(500, err.message || 'Failed to update user profile');
  }
}
}
