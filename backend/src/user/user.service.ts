import { Injectable,ConflictException } from '@nestjs/common';
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

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Address') private addressModel: Model<Address>,
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
      const existing = await this.userModel.findOne({ userEmail: createUserDto.userEmail }).exec();
      console.log(existing)
      if (existing) throw new ConflictException('Email already exists');
       
      const hashed = await bcrypt.hash(createUserDto.userPassword, 10);
      console.log('hisa',hashed)
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
  
  async updateUserByUserId(
    userId: string,
    updateData: Partial<CreateUserDto>,
  ) {
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
}
