import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subcategory } from '../category.schema/sub-category.schema';
import { CreateSubcategoryDTO } from '../dto/create-subcategory.dto';
import CustomResponse from 'src/common/providers/custom-response.service';
import { throwException } from 'src/util/errorhandling';
import { Category } from '../category.schema/category.schema';
import { fileUpload } from 'src/util/fileupload';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel('Subcategory') private subcategoryModel: Model<Subcategory>,
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  // -----------------------------------------------------
  // CREATE SUBCATEGORY
  // -----------------------------------------------------
  async createSubcategory(createSubcategoryDto: CreateSubcategoryDTO, files: any[] = []) {
    try {
      // Parse laundryItems if string
      if (createSubcategoryDto.laundryItems && typeof createSubcategoryDto.laundryItems === 'string') {
        createSubcategoryDto.laundryItems = JSON.parse(createSubcategoryDto.laundryItems);
      }

      if (createSubcategoryDto.laundryItems && !Array.isArray(createSubcategoryDto.laundryItems)) {
        throw new BadRequestException('laundryItems must be an array of objects');
      }

      // Price calculation
      let totalPrice = 0;
      if (createSubcategoryDto.laundryItems?.length) {
        createSubcategoryDto.laundryItems.forEach(item => {
          totalPrice += Number(item.count) * Number(item.price);
        });
      } else if (createSubcategoryDto.price) {
        totalPrice = Number(createSubcategoryDto.price);
      }
      createSubcategoryDto.price = totalPrice;

      // Image handling
      const webFile = files.find(f => f.fieldname === 'web_image');
      const appFile = files.find(f => f.fieldname === 'app_image');

      createSubcategoryDto['web_image'] = webFile
        ? [`${process.env.SERVER_BASE_URL}uploads/subcategory/webImage/${fileUpload('subcategory/webImage', webFile)}`]
        : [];
      createSubcategoryDto['app_image'] = appFile
        ? [`${process.env.SERVER_BASE_URL}uploads/subcategory/appImage/${fileUpload('subcategory/appImage', appFile)}`]
        : [];

      const subcategory = new this.subcategoryModel(createSubcategoryDto);
      const saved = await subcategory.save();
      return new CustomResponse(HttpStatus.OK, 'Create Subcategory Successfully', saved);
    } catch (error) {
      throwException(error);
    }
  }

  // -----------------------------------------------------
  // UPDATE SUBCATEGORY
  // -----------------------------------------------------
  async updateSubcategory(id: string, updateDto: CreateSubcategoryDTO, files: any[] = []) {
    try {
      const existing = await this.subcategoryModel.findById(id);
      if (!existing) throw new NotFoundException('SubCategory not found');

      if (updateDto.laundryItems && typeof updateDto.laundryItems === 'string') {
        updateDto.laundryItems = JSON.parse(updateDto.laundryItems);
      }

      if (updateDto.laundryItems && !Array.isArray(updateDto.laundryItems)) {
        throw new BadRequestException('laundryItems must be an array of objects');
      }

      // Price calculation
      let finalPrice = existing.price;
      if (updateDto.laundryItems?.length) {
        finalPrice = updateDto.laundryItems.reduce(
          (sum, item) => sum + Number(item.count) * Number(item.price),
          0,
        );
      } else if (updateDto.price) {
        finalPrice = Number(updateDto.price);
      }
      updateDto.price = finalPrice;

      // Image handling
      if (files.length) {
        const webFile = files.find(f => f.fieldname === 'web_image');
        if (webFile) {
          updateDto['web_image'] = [`${process.env.SERVER_BASE_URL}uploads/subcategory/webImage/${fileUpload('subcategory/webImage', webFile)}`];
        }
        const appFile = files.find(f => f.fieldname === 'app_image');
        if (appFile) {
          updateDto['app_image'] = [`${process.env.SERVER_BASE_URL}uploads/subcategory/appImage/${fileUpload('subcategory/appImage', appFile)}`];
        }
      }

      const updated = await this.subcategoryModel.findByIdAndUpdate(id, updateDto, { new: true });
      return new CustomResponse(HttpStatus.OK, 'SubCategory updated successfully', updated);
    } catch (error) {
      throwException(error);
    }
  }

  // -----------------------------------------------------
  // DELETE SUBCATEGORY
  // -----------------------------------------------------
  async deleteSubcategory(id: string) {
    try {
      const existing = await this.subcategoryModel.findById(id);
      if (!existing) throw new NotFoundException('SubCategory not found');

      const deleted = await this.subcategoryModel.findByIdAndDelete(id);
      return new CustomResponse(HttpStatus.OK, 'SubCategory deleted successfully', deleted);
    } catch (error) {
      throwException(error);
    }
  }

  // -----------------------------------------------------
  // GET ALL SUBCATEGORIES
  // -----------------------------------------------------
  async getAllSubcategories() {
    try {
      const all = await this.subcategoryModel.find();
      return new CustomResponse(HttpStatus.OK, 'All subcategories fetched', all);
    } catch (error) {
      throwException(error);
    }
  }

  // -----------------------------------------------------
  // GET BY USER TYPE
  // -----------------------------------------------------
  async getSubcategoriesByUserType(userType: string) {
    try {
      const filtered = await this.subcategoryModel.find({ userType });
      return new CustomResponse(HttpStatus.OK, 'Subcategories fetched by userType', filtered);
    } catch (error) {
      throwException(error);
    }
  }

  // -----------------------------------------------------
  // GET BY SUBCATEGORY ID
  // -----------------------------------------------------
  async getSubCategoryBySubcategoryID(id: string) {
    try {
      const subcat = await this.subcategoryModel.findById(id);
      if (!subcat) return new CustomResponse(404, 'SubCategory not found');
      return new CustomResponse(HttpStatus.OK, 'SubCategory fetched', subcat);
    } catch (error) {
      throwException(error);
    }
  }

  // -----------------------------------------------------
  // GET BY CATEGORY ID
  // -----------------------------------------------------
  async getSubcategoriesByCategoryId(categoryId: string) {
    try {
      const subcats = await this.subcategoryModel.find({ categoryId });
      return new CustomResponse(HttpStatus.OK, 'Subcategories fetched by categoryId', subcats);
    } catch (error) {
      throwException(error);
    }
  }

  // -----------------------------------------------------
  // FILTERED SUBCATEGORIES
  // -----------------------------------------------------
  async getFilteredSubCategories(filters: Record<string, any>) {
    try {
      const query: any = {};
      for (const [key, value] of Object.entries(filters)) {
        if (!value) continue;
        if (['is_published', 'categoryId', 'name', 'categoryType'].includes(key)) {
          query[key] = value;
        } else if (key === 'id') {
          query._id = new Types.ObjectId(value);
        } else {
          query[key] = { $regex: value, $options: 'i' };
        }
      }

      const filtered = await this.subcategoryModel.find(query).exec();
      if (!filtered.length) return new CustomResponse(404, 'SubCategory not found');
      return new CustomResponse(200, 'Filtered subcategories fetched', filtered);
    } catch (error) {
      throwException(error);
    }
  }
}
