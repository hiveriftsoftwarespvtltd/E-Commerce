import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Req,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Req() req: any) {
    return this.profileService.getProfile(req.user.id || req.user.sub);
  }

  @Patch('update')
  @UseInterceptors(FileInterceptor('profileImage')) 
  async updateProfile(
    @Req() req: any,
    @Body() dto: any, 
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log('Received DTO:', dto);
    console.log('Received File:', file ? file.originalname : 'No file uploaded');

    return this.profileService.updateProfile(
      req.user.id || req.user.sub,
      dto,
      file,
    );
  }
  
  @Post('change-password')
  changePassword(@Req() req: any, @Body() dto: any) {
    return this.profileService.changePassword(req.user.id || req.user.sub, dto);
  }
}
