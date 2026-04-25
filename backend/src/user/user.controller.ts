import { Body, Controller, Param, Post, Get, Put, Query } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { ROUTE } from 'src/util/constants';
import { AddressDto } from './dto/address.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller(ROUTE.USER)
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
}
