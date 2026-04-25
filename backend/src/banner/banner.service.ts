// src/banner/banner.service.ts (Tera same logic, bas error better kiya)

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from './schema/banner.schema';
import { fileUpload } from 'src/util/fileupload';
import CustomResponse from 'src/common/providers/custom-response.service';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name) private bannerModel: Model<BannerDocument>,
  ) {}

  async create(createBannerDto: any, file: Express.Multer.File) {
    try {
      if (!file) {
        // YE CHANGE KIYA → Error ko proper NestJS exception banaya
        throw new BadRequestException('Banner image is required');
      }

      const fileName = fileUpload('banners', file);
      const imageUrl = `${process.env.SERVER_BASE_URL}uploads/banners/${fileName}`;

      const banner = new this.bannerModel({
        ...createBannerDto,
        image: imageUrl,
      });

      const saved = await banner.save();
      return new CustomResponse(201, 'Banner created successfully', saved);
    } catch (error) {
      throw error; 
    }
  }

  async findAll() {
    const banners = await this.bannerModel.find().sort({ createdAt: -1 });
    return new CustomResponse(200, 'Banners fetched successfully', banners);
  }

  async findOne(id: string) {
    const banner = await this.bannerModel.findById(id);
    if (!banner) {
      throw new CustomResponse(404, 'Banner not found');
    }
    return new CustomResponse(200, 'Banner fetched', banner);
  }

  async update(id: string, updateDto: any, file?: Express.Multer.File) {
    const updateData: any = { ...updateDto };

    if (file) {
      const fileName = fileUpload('banners', file);
      updateData.image = `${process.env.SERVER_BASE_URL}uploads/banners/${fileName}`;
    }

    const updated = await this.bannerModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      throw new CustomResponse(404, 'Banner not found');
    }

    return new CustomResponse(200, 'Banner updated successfully', updated);
  }

  async remove(id: string) {
    const deleted = await this.bannerModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new CustomResponse(404, 'Banner not found');
    }
    return new CustomResponse(200, 'Banner deleted successfully', deleted);
  }
}