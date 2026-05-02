import { Injectable, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import * as otpLib from 'otplib';
import { User } from 'src/user/interface/user.interface';
import CustomResponse from 'src/common/providers/custom-response.service';
import { throwException } from 'src/util/errorhandling';
import { Rider } from 'src/rider/rider.schema/rider.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Rider') private readonly riderModel: Model<Rider>,
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // OTP GENERATION
  generateOTP() {
    otpLib.totp.options = { digits: 4 };
    return otpLib.totp.generate('secret-key');
  }

  async sendOTP(createUserDto: any): Promise<any> {
    try {
      const otp = this.generateOTP();
      const userPhone = createUserDto.userPhone;
      const user = await this.userModel.findOne({ userPhone });

      if (!user) {
        const newUser = new this.userModel({ userPhone, otp });
        await newUser.save();
      } else {
        await this.userModel.updateOne(
          { userPhone },
          { otp, otpExpiration: new Date(Date.now() + 1 * 60 * 1000) }
        );
      }

      return new CustomResponse(HttpStatus.OK, 'OTP sent successfully');
    } catch (error) {
      throwException(error);
    }
  }

  async verifyOTP(createUserDto: any): Promise<any> {
    try {
      const userPhone = createUserDto.userPhone;
      const user = await this.userModel.findOne({ userPhone });

      if (user && createUserDto.otp === user.otp && new Date() < user.otpExpiration) {
        return new CustomResponse(HttpStatus.OK, 'OTP verified', user);
      } else if (createUserDto.userType === 'rider') {
        const rider = await this.riderModel.findOne({ userPhone });
        return new CustomResponse(HttpStatus.OK, 'OTP verified', rider);
      }

      return new CustomResponse(401, 'OTP expired or invalid');
    } catch (error) {
      throwException('Failed to verify OTP');
    }
  }

  async resendOtp(createUserDto: any): Promise<any> {
    try {
      const otp = this.generateOTP();
      const userPhone = createUserDto.userPhone;
      const user = await this.userModel.findOne({ userPhone });

      if (!user) {
        const newUser = new this.userModel({ userPhone, otp });
        await newUser.save();
      } else {
        await this.userModel.updateOne(
          { userPhone },
          { otp, otpExpiration: new Date(Date.now() + 1 * 60 * 1000) }
        );
      }

      return new CustomResponse(HttpStatus.OK, 'OTP resent successfully');
    } catch (error) {
      throwException('Failed to resend OTP');
    }
  }

  // ========================
  // ADMIN LOGIN
  // ========================
  async adminLogin(userEmail: string, userPassword: string): Promise<any> {
    try {
      if (!userEmail || !userPassword) throw new BadRequestException('Email and password required');

      const normalizedEmail = userEmail.toLowerCase().trim();
      const user = await this.userModel.findOne({ userEmail: normalizedEmail });

      if (!user) throw new UnauthorizedException('User not found');
      if (user.role !== 'admin') throw new UnauthorizedException('Access denied');

      const passwordValid = await bcrypt.compare(userPassword, user.userPassword);
      if (!passwordValid) throw new UnauthorizedException('Invalid password');

      const payload = { userId: user._id, email: user.userEmail, role: user.role };
      const token = this.jwtService.sign(payload);

      const safeUser = { _id: user._id, userEmail: user.userEmail, role: user.role, access_token: token };

      return new CustomResponse(200, 'Admin login successful', safeUser);
    } catch (error) {
      throwException(error);
    }
  }

  // ========================
  // NORMAL LOGIN (USER/ADMIN)
  // ========================
  async login(email: string, password: string) {
    const user = await this.userService.findByEmailUser(email);
    if (!user) throw new UnauthorizedException('User not found');

    const passwordValid = await bcrypt.compare(password, user.userPassword);
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { userId: user._id, email: user.userEmail, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      statusCode: 200,
      message: 'Login successful',
      data: { access_token: token, user: { id: user._id,name:user.userName, email: user.userEmail, role: user.role,avatar:user.userAvatarUrl },success:true },
    };
  }

  // ========================
  // USER REGISTRATION
  // ========================
  async register(createUserDto: any): Promise<any> {
    try {
      const { userEmail, userPassword } = createUserDto;
      if (!userEmail || !userPassword) throw new BadRequestException('Email and password required');

      const normalizedEmail = userEmail.toLowerCase().trim();
      const existingUser = await this.userModel.findOne({ userEmail: normalizedEmail });
      if (existingUser) throw new BadRequestException('User already exists');

      const hashedPassword = await bcrypt.hash(userPassword, 10);

      const newUser = new this.userModel({ ...createUserDto, userEmail: normalizedEmail, userPassword: hashedPassword, role: 'user' });
      await newUser.save();

      const safeUser = { _id: newUser._id, userEmail: newUser.userEmail, role: newUser.role };
      return new CustomResponse(201, 'User registered successfully', safeUser);
    } catch (error) {
      throwException(error);
    }
  }

  async changePassword(body: {
  userId: string;
  oldPassword: string;
  newPassword: string;
}): Promise<any> {
  try {
    const { userId, oldPassword, newPassword } = body;

    // 1. Find user
    const user = await this.userModel
      .findById(userId)
      .select('+userPassword');

    if (!user) {
      return new CustomResponse(HttpStatus.NOT_FOUND, 'User not found');
    }

    if (!user.userPassword) {
      return new CustomResponse(
        HttpStatus.BAD_REQUEST,
        'Password not set for this user',
      );
    }

    // 2. Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.userPassword);

    if (!isMatch) {
      return new CustomResponse(
        HttpStatus.BAD_REQUEST,
        'Old password is incorrect',
      );
    }

    // 3. Prevent same password reuse
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.userPassword,
    );

    if (isSamePassword) {
      return new CustomResponse(
        HttpStatus.BAD_REQUEST,
        'New password cannot be same as old password',
      );
    }

    // 4. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5. Update password (better approach)
    user.userPassword = hashedPassword;
    await user.save();

    return new CustomResponse(
      HttpStatus.OK,
      'Password changed successfully',
    );
  } catch (error) {
    throwException(error);
  }
}
}
