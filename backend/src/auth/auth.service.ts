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
import { generateOTP, otpTemplate, sendMailHelper } from 'src/helpers/mail.service';

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

  // async sendOTP(createUserDto: any): Promise<any> {
  //   try {
  //     const otp = this.generateOTP();
  //     const userPhone = createUserDto.userPhone;
  //     const user = await this.userModel.findOne({ userPhone });

  //     if (!user) {
  //       const newUser = new this.userModel({ userPhone, otp });
  //       await newUser.save();
  //     } else {
  //       await this.userModel.updateOne(
  //         { userPhone },
  //         { otp, otpExpiration: new Date(Date.now() + 1 * 60 * 1000) }
  //       );
  //     }

  //     return new CustomResponse(HttpStatus.OK, 'OTP sent successfully');
  //   } catch (error) {
  //     throwException(error);
  //   }
  // }

  // async verifyOTP(createUserDto: any): Promise<any> {
  //   try {
  //     const userPhone = createUserDto.userPhone;
  //     const user = await this.userModel.findOne({ userPhone });

  //     if (user && createUserDto.otp === user.otp && new Date() < user.otpExpiration) {
  //       return new CustomResponse(HttpStatus.OK, 'OTP verified', user);
  //     } else if (createUserDto.userType === 'rider') {
  //       const rider = await this.riderModel.findOne({ userPhone });
  //       return new CustomResponse(HttpStatus.OK, 'OTP verified', rider);
  //     }

  //     return new CustomResponse(401, 'OTP expired or invalid');
  //   } catch (error) {
  //     throwException('Failed to verify OTP');
  //   }
  // }

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



async sendForgotPasswordOTP(body: { email: string }): Promise<any> {
  try {
    const { email } = body;

    const user = await this.userModel.findOne({ userEmail: email });

    if (!user) {
      return new CustomResponse(HttpStatus.NOT_FOUND, 'User not found');
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const html = otpTemplate(otp);

    const isSent = await sendMailHelper(email, 'Password Reset OTP', html);

    if (!isSent) {
      return new CustomResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to send OTP');
    }

    return new CustomResponse(HttpStatus.OK, 'OTP sent successfully');

  } catch (error) {
    throwException(error);
  }
}

async verifyOTP(body: { email: string ; otp: string  }) {
  try {
    const { email, otp } = body;

    const user = await this.userModel.findOne({ userEmail: email });

    if (!user) {
      return new CustomResponse(HttpStatus.NOT_FOUND, 'User not found');
    }

    if (!user.otp || !user.otpExpiration) {
      return new CustomResponse(HttpStatus.BAD_REQUEST, 'No OTP found');
    }

    if (user.otp !== otp) {
      return new CustomResponse(HttpStatus.BAD_REQUEST, 'Invalid OTP');
    }

    if (user.otpExpiration < new Date()) {
      return new CustomResponse(HttpStatus.BAD_REQUEST, 'OTP expired');
    }

    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    return new CustomResponse(HttpStatus.OK, 'OTP verified');

  } catch (error) {
    throwException(error);
  }
}

async sendResetPasswordLink(body: { email: string }): Promise<any> {
  try {
    const { email } = body;

    const user = await this.userModel.findOne({ userEmail: email });

    if (!user) {
      return new CustomResponse(HttpStatus.NOT_FOUND, 'User not found',null,false);
    }

    // 🔐 Generate token
    const token = this.jwtService.sign(
      { userId: user._id, email: user.userEmail },
      { expiresIn: '10m' }
    );

    // 💾 Save token in DB (important for single-use)
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // 🌐 Dynamic URL
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173'
        : 'https://storeforexplore.in';

    const resetLink = `${baseUrl}/auth/reset-password?token=${token}`;

    // 📩 Email template
    const html = `
      <div style="font-family: Arial; padding:20px">
        <h2>Reset Your Password</h2>
        <p>Click below to reset your password for <b>Store For Explore</b>:</p>
        <a href="${resetLink}" 
           style="display:inline-block;padding:10px 20px;background:#4CAF50;color:#fff;text-decoration:none;border-radius:5px">
           Reset Password
        </a>
        <p>This link will expire in 10 minutes.</p>
      </div>
    `;

    const isSent = await sendMailHelper(
      email,
      'Reset Password - Store For Explore',
      html
    );

    if (!isSent) {
      return new CustomResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to send email',null,false
      );
    }

    return new CustomResponse(HttpStatus.OK, 'Reset link sent');

  } catch (error) {
    throwException(error);
  }
}

async resetPassword(body: { token: string; newPassword: string }) {
  try {
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return new CustomResponse(
        HttpStatus.BAD_REQUEST,
        'Token and password required',null,false
      );
    }

    // 🔍 Verify JWT
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (err) {
      return new CustomResponse(
        HttpStatus.BAD_REQUEST,
        'Invalid or expired link',null,false
      );
    }

    const user = await this.userModel.findById(payload.userId);

    if (!user) {
      return new CustomResponse(HttpStatus.NOT_FOUND, 'User not found',null,false);
    }

    // 🔒 Check DB token (VERY IMPORTANT)
    if (
      user.resetToken !== token ||
      !user.resetTokenExpiry ||
      user.resetTokenExpiry < new Date()
    ) {
      return new CustomResponse(
        HttpStatus.BAD_REQUEST,
        'Link expired or already used',null,false
      );
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.userPassword = hashedPassword;

    // ❌ Invalidate token (single-use)
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return new CustomResponse(
      HttpStatus.OK,
      'Password reset successful'
    );

  } catch (error) {
    throwException(error);
  }
}
}
