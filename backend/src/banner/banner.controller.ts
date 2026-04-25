// src/banner/banner.controller.ts (Tera same code, bas thoda clean)

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/createBanner.dto';
import { UpdateBannerDto } from './dto/updateBanner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ROUTE } from 'src/util/constants';

@Controller(ROUTE.BANNER)
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post('createBanner')
  @UseInterceptors(FileInterceptor('image')) // Field name must be "image" in Postman
  create(
    @Body() createBannerDto: CreateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bannerService.create(createBannerDto, file);
  }

  @Get('getAllBanner')
  findAll() {
    return this.bannerService.findAll();
  }

  @Get('getBannerById/:id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(id);
  }

  @Put('editBanner/:id')
  @UseInterceptors(FileInterceptor('image')) // Update mein bhi "image" field
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.bannerService.update(id, updateBannerDto, file);
  }

  @Delete('deleteBanner/:id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}