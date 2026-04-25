import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { ROUTE } from 'src/util/constants';
import { UserService } from 'src/user/user.service';

@Controller(ROUTE.AUTH)
export class AuthController {
  constructor(private authService: AuthService,
   private userservice : UserService,
  ) {}

  @Post('register')
  async register(@Body() adminLoginDto: AdminLoginDto) {
    console.log('console.',adminLoginDto)
    return await this.userservice.create(adminLoginDto);
  }
  
  @Post('generate-otp')
  async generateOTP(@Body() createUserDto: CreateUserDto) {
    return this.authService.sendOTP(createUserDto);
  }

  @Post('verify-otp')
  async verifyOTP(@Body() createUserDto: VerifyOtpDto) {
    return this.authService.verifyOTP(createUserDto);
  }

  @Post('resend-otp')
  async resendOtp(@Body() createUserDto: CreateUserDto) {
    return this.authService.resendOtp(createUserDto);
  }

  @Post('admin-login')
  async adminLogin(@Body() adminLoginDto: AdminLoginDto) {
    return this.authService.adminLogin(
      adminLoginDto.userEmail,
      adminLoginDto.userPassword,
    );
  }


  

  @Post('login')
  async login(@Body() body: { userEmail: string; userPassword: string }) {
    return await this.authService.login(body.userEmail, body.userPassword);
  }

}
