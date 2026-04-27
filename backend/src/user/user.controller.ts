import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { ROUTE } from 'src/util/constants';
import { AddressDto } from './dto/address.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller(ROUTE.USER)
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // CREATE ADDRESS
  @Post('create-address')
  async createAddress(@Body() dto: AddressDto) {
    return this.userService.createAddress(dto);
  }

  // GET ADDRESS
  @Get('address/:userId')
  async getAddress(@Param('userId') userId: string) {
    return this.userService.getAddress(userId);
  }

  // UPDATE LOCATION
  @Put('update-location/:id')
  async updateLocation(
    @Param('id') userId: string,
    @Body() body: { longitude: string; latitude: string; address: string },
  ) {
    return this.userService.updateLocation(
      userId,
      body.longitude,
      body.latitude,
      body.address,
    );
  }

  // NEARBY USERS
  @Get('nearby-users')
  async getNearbyUsers(
    @Query('longitude') longitude: string,
    @Query('latitude') latitude: string,
  ) {
    return this.userService.findNearbyUsers(longitude, latitude);
  }

  // GET USER BY ID
  @Get('getUser/:userId')
  async getUserById(@Param('userId') userId: string) {
    return this.userService.findUserById(userId);
  }

  // UPDATE USER (FIXED)
  @Put('updateUser/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateData: Partial<CreateUserDto>,
  ) {
    return this.userService.updateUserByUserId(userId, updateData);
  }

  @Post('upload-profile/:userId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads/profile';

          // ✅ create folder if not exists
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },

        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  uploadProfile(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadProfileImage(userId, file);
  }

  @Get("/user-profile")
  async getUserProfile(@Req() req){
    return this.userService.getUserProfile(req.user.id)
  }

  @Put("/update-profile")
  async updateProfile(@Req() req ,@Body() dto:UpdateUserDto){
    return this.userService.updateUserProfile(req.user.id,dto)
  }
}
