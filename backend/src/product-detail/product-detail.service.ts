import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QueryProductDto } from './dto/query-product.dto';
import * as fs from 'fs';
import CustomError from 'src/common/providers/customer-error.service';
import CustomResponse from 'src/common/providers/custom-response.service';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectModel(ProductDetail.name)
    private productModel: Model<ProductDetail>,

    @InjectModel('Wishlist')
    private wishlistModel: Model<any>,
  ) {}

  async create(createProductDto: CreateProductDetailDto) {
    try {
      const { categoryId, ...rest } = createProductDto;

      const existing = await this.productModel.findOne({ sku: rest.sku });
      if (existing) {
        throw new CustomError(400, 'SKU already exists');
      }

      if (rest.salesPrice > rest.price) {
        throw new CustomError(400, 'Sales price cannot be greater than price');
      }

      if (rest.stock < 0) {
        throw new CustomError(400, 'Stock cannot be negative');
      }

      const product = await this.productModel.create({
        ...rest,
        category: categoryId,
      });

      return new CustomResponse(201, 'Product created successfully', product);

    } catch (error:any) {
      throw error instanceof CustomError
        ? error
        : new CustomError(500, error.message);
    }
  }

  async findAll(userId?: string) {
    try {
      const products = await this.productModel
        .find()
        .populate('category')
        .lean();

      if (!products.length) {
        return new CustomResponse(200, 'No products found', []);
      }

      if (!userId) {
        return new CustomResponse(200, 'Products fetched', products);
      }

      const wishlistItems = await this.wishlistModel
        .find({ user: userId })
        .select('product')
        .lean();

      const wishlistSet = new Set(
        wishlistItems.map(item => item.product.toString())
      );

      const updatedProducts = products.map(product => ({
        ...product,
        isFavourite: wishlistSet.has(product._id.toString()),
      }));

      return new CustomResponse(200, 'Products fetched', updatedProducts);

    } catch (error:any) {
      throw new CustomError(500, error.message);
    }
  }

  async findOne(id: string, userId?: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid product ID');
      }

      const product = await this.productModel.findById(id).lean();

      if (!product) {
        throw new CustomError(404, 'Product not found');
      }

      if (!userId) {
        return new CustomResponse(200, 'Product fetched', product);
      }

      const exists = await this.wishlistModel.exists({
        user: userId,
        product: id,
      });

      return new CustomResponse(200, 'Product fetched', {
        ...product,
        isFavourite: !!exists,
      });

    } catch (error:any) {
      throw error instanceof CustomError
        ? error
        : new CustomError(500, error.message);
    }
  }

  async update(id: string, updateProductDetailDto: UpdateProductDetailDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid product ID');
      }

      const existing = await this.productModel.findById(id);
      if (!existing) {
        throw new CustomError(404, 'Product not found');
      }

      const baseUrl = process.env.BASE_URL ?? '';

      if (updateProductDetailDto.imageUrls?.length) {
        existing.imageUrls?.forEach((img: string) => {
          const filePath = img.replace(baseUrl, '');
          fs.unlink(`./${filePath}`, () => {});
        });
      }

      const updated = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDetailDto,
        { new: true },
      );

      return new CustomResponse(200, 'Product updated', updated);

    } catch (error:any) {
      throw error instanceof CustomError
        ? error
        : new CustomError(500, error.message);
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid product ID');
      }

      const existing = await this.productModel.findById(id);
      if (!existing) {
        throw new CustomError(404, 'Product not found');
      }

      const baseUrl = process.env.BASE_URL ?? '';

      existing.imageUrls?.forEach((img: string) => {
        const filePath = img.replace(baseUrl, '');
        fs.unlink(`./${filePath}`, () => {});
      });

      await this.productModel.findByIdAndDelete(id);

      return new CustomResponse(200, 'Product deleted');

    } catch (error:any) {
      throw new CustomError(500, error.message);
    }
  }

  async searchProducts(query: QueryProductDto) {
    try {
      const {
        search,
        subcategoryId,
        SalesPrice,
        status,
        minPrice,
        maxPrice,
        inStock,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = query;

      const filter: any = {};

      if (search) {
        const regex = new RegExp(search, 'i');
        filter.$or = [{ Name: regex }, { Description: regex }];
      }

      if (subcategoryId) filter.subcategoryId = subcategoryId;
      if (SalesPrice) filter.SalesPrice = SalesPrice;
      if (status) filter.STATUS = status;

      if (minPrice || maxPrice) {
        filter.Price = {};
        if (minPrice) filter.Price.$gte = Number(minPrice);
        if (maxPrice) filter.Price.$lte = Number(maxPrice);
      }

      if (inStock) filter.Stock = inStock;

      const skip = (Number(page) - 1) * Number(limit);

      const sort: any = {
        [sortBy]: sortOrder === 'asc' ? 1 : -1,
      };

      const [data, total] = await Promise.all([
        this.productModel.find(filter).skip(skip).limit(Number(limit)).sort(sort),
        this.productModel.countDocuments(filter),
      ]);

      return new CustomResponse(200, 'Products fetched', {
        total,
        page: Number(page),
        limit: Number(limit),
        data,
      });

    } catch (error:any) {
      throw new CustomError(500, error.message);
    }
  }
}
