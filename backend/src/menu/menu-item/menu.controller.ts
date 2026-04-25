import { Controller, Post, Get, Body, Param, Delete, Put, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import slugify from 'slugify';

const imageStorage = diskStorage({
  destination: './uploads/images',
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

@Controller('menu') // ✅ सिर्फ 'menu', global prefix app.setGlobalPrefix('api/v1') के साथ
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image', { storage: imageStorage }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');
    const fileUrl = `http://localhost:4000/uploads/images/${file.filename}`;
    return { success: true, message: 'Image uploaded successfully', imageUrl: fileUrl };
  }

  @Post()
  async create(@Body() menuData: { menuName: string; subItems: any[] }) {
    return this.menuService.createMenuItem(menuData);
  }

  @Get()
  async getAll() {
    return this.menuService.getAllMenuItems();
  }

  @Get('name/:menuName')
  async getByName(@Param('menuName') menuName: string) {
    return this.menuService.getMenuByName(menuName);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: any) {
    return this.menuService.updateMenuItem(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.menuService.deleteMenuItem(id);
  }
}
