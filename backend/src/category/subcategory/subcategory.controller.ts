import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { SubcategoryService } from '../subcategory/subcategory.service';
import {
  CreateSubcategoryDTO,
  UpdateSubcategoryDTO,
} from '../dto/create-subcategory.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createSubcategory(
    @Body() createSubcategoryDto: CreateSubcategoryDTO,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.subcategoryService.createSubcategory(
      createSubcategoryDto,
      files || [], 
    );
  }

  @Put('editSubCategory/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async updateSubcategory(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: CreateSubcategoryDTO,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.subcategoryService.updateSubcategory(
      id,
      updateSubcategoryDto,
      files || [],
    );
  }

  @Delete('deleteSubCategory/:id')
  async deleteSubcategory(@Param('id') id: string) {
    return this.subcategoryService.deleteSubcategory(id);
  }

  @Get('getCategoryByUserType')
  async getSubcategoriesByUserType(
    @Query('userType') userType: 'daily' | 'permanent',
  ) {
    return this.subcategoryService.getSubcategoriesByUserType(userType);
  }

  @Get('getAllSubCategory')
  async getAllSubcategories() {
    return this.subcategoryService.getAllSubcategories();
  }

  @Get('getSubCategoryBySubcategoryID/:id')
  async getSubCategoryBySubcategoryID(@Param('id') id: string) {
    return this.subcategoryService.getSubCategoryBySubcategoryID(id);
  }

  @Get('getSubcategoriesByCategoryId/:categoryId')
  async getSubcategoriesByCategoryId(@Param('categoryId') categoryId: string) {
    return this.subcategoryService.getSubcategoriesByCategoryId(categoryId);
  }

  @Get('getFilteredSubCategories')
  async getCategories(@Query() filterParams: Record<string, any>) {
    return this.subcategoryService.getFilteredSubCategories(filterParams);
  }
}
