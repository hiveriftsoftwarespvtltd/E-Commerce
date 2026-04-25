import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto/create-category.dto';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private baseUrl =  process.env.BASE_URL ||  "http://localhost:8000";

  // @Post('addCategory')
  // // @UseInterceptors(
  // //   FileFieldsInterceptor([
  // //     { name: 'web_image', maxCount: 1 },
  // //     { name: 'app_image', maxCount: 1 },
  // //   ]),
  // // )
  // @UseInterceptors(
  //     AnyFilesInterceptor({
  //       storage: diskStorage({
  //         destination: './uploads/products',
  //         filename: (req, file, cb) => {
  //           const uniqueName =
  //             Date.now() + '-' + Math.round(Math.random() * 1e9);
  //           cb(null, uniqueName + extname(file.originalname));
  //         },
  //       }),
  //     }),
  //   )
  // async createCategory(
  //   @Body() body: CreateCategoryDTO,
  //   @UploadedFiles() files: any,
  // ) {
  //   return this.categoryService.createCategory(body, files);
  // }

  @Post('addCategory')
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'web_image', maxCount: 1 },
    { name: 'app_image', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: (req, file, cb) => {
  let uploadPath = '';

  if (file.fieldname === 'web_image') {
    uploadPath = './uploads/category/webImage';
  } else if (file.fieldname === 'app_image') {
    uploadPath = './uploads/category/appImage';
  }

  // ✅ create folder if not exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  cb(null, uploadPath);
},
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, uniqueName + extname(file.originalname));
      },
    }),
  }),
)
async createCategory(
  @Body() body: CreateCategoryDTO,
  @UploadedFiles() files: {
    web_image?: Express.Multer.File[];
    app_image?: Express.Multer.File[];
  },
) {
  return this.categoryService.createCategory(body, files);
}
  // @Put('editCategory/:id')
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'web_image', maxCount: 1 },
  //     { name: 'app_image', maxCount: 1 },
  //   ]),
  // )
  // async updateCategory(
  //   @Param('id') id: string,
  //   @Body() body: any,
  //   @UploadedFiles() files: any,
  // ) {
  //   let updateCategoryDto: UpdateCategoryDTO;

  //   try {
  //     updateCategoryDto = body.data ? JSON.parse(body.data) : body;
  //   } catch {
  //     updateCategoryDto = body;
  //   }

  //   return this.categoryService.updateCategory(id, updateCategoryDto, files);
  // }
@Put('editCategory/:id')
@UseInterceptors(
  FileFieldsInterceptor(
    [
      { name: 'web_image', maxCount: 1 },
      { name: 'app_image', maxCount: 1 },
    ],
    {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (file.fieldname === 'web_image') {
            cb(null, './uploads/category/webImage');
          } else if (file.fieldname === 'app_image') {
            cb(null, './uploads/category/appImage');
          }
          
        },
        
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;
          
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    },
  ),
)
async updateCategory(
  @Param('id') id: string,
  @Body() body: any,
  @UploadedFiles() files: {
    web_image?: Express.Multer.File[];
    app_image?: Express.Multer.File[];
  },
) {
  let updateCategoryDto: UpdateCategoryDTO;

  try {
    updateCategoryDto = body.data ? JSON.parse(body.data) : body;
  } catch {
    updateCategoryDto = body;
  }

  return this.categoryService.updateCategory(id, updateCategoryDto, files);
}

  @Delete('deleteCategory/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Get('getCategoryById/:id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Get('getAllCategory')
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('getFilteredCategories')
  async getFilteredCategories(@Query() filter: any) {
    return this.categoryService.getFilteredCategories(filter);
  }
}
