import {
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from '../category/category.schema/category.schema';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../category/dto/create-category.dto';
import CustomResponse from 'src/common/providers/custom-response.service';
import { throwException } from 'src/util/errorhandling';
import { fileUpload } from 'src/util/fileupload';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

   private baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.SERVER_BASE_URL!
    : 'http://localhost:8000/';

  // async createCategory(createCategoryDto: CreateCategoryDTO, files: any) {
  //   try {
  //     const webImageFile = files?.web_image?.[0] || null;
  //     const appImageFile = files?.app_image?.[0] || null;

  //     if (webImageFile) {
  //       const fileName = fileUpload('category/webImage', webImageFile);
  //       createCategoryDto.web_image = [
  //         `${process.env.SERVER_BASE_URL}uploads/category/webImage/${fileName}`,
  //       ];
  //     }

  //     if (appImageFile) {
  //       const fileName = fileUpload('category/appImage', appImageFile);
  //       createCategoryDto.app_image = [
  //         `${process.env.SERVER_BASE_URL}uploads/category/appImage/${fileName}`,
  //       ];
  //     }

  //     const exists = await this.categoryModel.findOne({
  //       $or: [
  //         { name: createCategoryDto.name },
  //         { slug: createCategoryDto.slug },
  //       ],
  //     });

  //     if (exists) {
  //       return new CustomResponse(403, 'Category already exists');
  //     }

  //     const save = new this.categoryModel(createCategoryDto);
  //     const result = await save.save();

  //     return new CustomResponse(HttpStatus.OK, 'Category Saved', result);
  //   } catch (err) {
  //     throwException(err);
  //   }
  // }

  async createCategory(createCategoryDto: CreateCategoryDTO, files: any) {
  try {
    if (files?.web_image?.[0]) {
      createCategoryDto.web_image = [
        `${this.baseUrl}uploads/category/webImage/${files.web_image[0].filename}`,
      ];
    }

    if (files?.app_image?.[0]) {
      createCategoryDto.app_image = [
        `${this.baseUrl}uploads/category/appImage/${files.app_image[0].filename}`,
      ];
    }

    const exists = await this.categoryModel.findOne({
      $or: [
        { name: createCategoryDto.name },
        { slug: createCategoryDto.slug },
      ],
    });

    if (exists) {
      return new CustomResponse(403, 'Category already exists');
    }

    const save = new this.categoryModel(createCategoryDto);
    const result = await save.save();

    return new CustomResponse(HttpStatus.OK, 'Category Saved', result);
  } catch (err) {
    throwException(err);
  }
}
  // async updateCategory(
  //   id: string,
  //   updateCategoryDto: UpdateCategoryDTO,
  //   files: any,
  // ) {
  //   try {
  //     const webImageFile = files?.web_image?.[0] || null;
  //     const appImageFile = files?.app_image?.[0] || null;

  //     if (webImageFile) {
  //       const fileName = fileUpload('category/webImage', webImageFile);
  //       updateCategoryDto.web_image = [
  //         `${process.env.SERVER_BASE_URL}uploads/category/webImage/${fileName}`,
  //       ];
  //     }

  //     if (appImageFile) {
  //       const fileName = fileUpload('category/appImage', appImageFile);
  //       updateCategoryDto.app_image = [
  //         `${process.env.SERVER_BASE_URL}uploads/category/appImage/${fileName}`,
  //       ];
  //     }

  //     const updated = await this.categoryModel.findByIdAndUpdate(
  //       id,
  //       updateCategoryDto,
  //       { new: true },
  //     );

  //     if (!updated) {
  //       return new CustomResponse(404, 'Category not found');
  //     }

  //     return new CustomResponse(HttpStatus.OK, 'Category Updated', updated);
  //   } catch (err) {
  //     throwException(err);
  //   }
  // }

  async updateCategory(
  id: string,
  updateCategoryDto: UpdateCategoryDTO,
  files: any,
) {
  try {
    const existing = await this.categoryModel.findById(id);

    if (!existing) {
      return new CustomResponse(404, 'Category not found');
    }

    // ✅ WEB IMAGE
    if (files?.web_image?.[0]) {
      // delete old file
      if (existing.web_image?.[0]) {
 
        console.log("base Url line 155",this.baseUrl)
  const oldPath = existing.web_image[0].replace(this.baseUrl, '');
}

      updateCategoryDto.web_image = [
        `${this.baseUrl}uploads/category/webImage/${files.web_image[0].filename}`,
      ];
    }

    // ✅ APP IMAGE
    if (files?.app_image?.[0]) {
      if (existing.app_image?.[0]) {
        
        const oldPath = existing.app_image[0].replace(
          this.baseUrl,'');
        fs.unlink(`./${oldPath}`, () => {});
      }

      updateCategoryDto.app_image = [
        `${this.baseUrl}uploads/category/appImage/${files.app_image[0].filename}`,
      ];
    }

    const updated = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );

    return new CustomResponse(HttpStatus.OK, 'Category Updated', updated);
  } catch (err) {
    throwException(err);
  }
}
  async deleteCategory(id: string) {
    try {
      const deleted = await this.categoryModel.findByIdAndDelete(id);
      return new CustomResponse(HttpStatus.OK, 'Category Deleted', deleted);
    } catch (err) {
      throwException(err);
    }
  }

  async getCategoryById(id: string) {
    try {
      const data = await this.categoryModel.findById(id);
      if (!data) return new CustomResponse(404, 'Category Not Found');
      return new CustomResponse(200, 'Success', data);
    } catch (err) {
      throwException(err);
    }
  }

  async getAllCategories() {
    console.log("base Url line 155",this.baseUrl)
    try {
      const data = await this.categoryModel.find();
      return new CustomResponse(200, 'Success', data);
    } catch (err) {
      throwException(err);
    }
  }

  async getFilteredCategories(filter: any) {
    try {
      const query: any = {};

      for (const [key, value] of Object.entries(filter)) {
        if (!value || value === '' || value === null) continue;

        if (key === 'id') {
          // FIXED: Validate ObjectId before using
          if (typeof value === 'string' && Types.ObjectId.isValid(value)) {
            query._id = new Types.ObjectId(value);
          }
          continue;
        }

        // string search (case-insensitive)
        query[key] = { $regex: value, $options: 'i' };
      }

      const result = await this.categoryModel.find(query);

      if (!result.length) {
        return new CustomResponse(404, 'No Categories Found');
      }

      return new CustomResponse(200, 'Filtered Result', result);
    } catch (err) {
      throwException(err);
    }
  }
}

