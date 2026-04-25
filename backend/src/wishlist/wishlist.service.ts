import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CustomResponse from 'src/common/providers/custom-response.service';
import CustomError from 'src/common/providers/customer-error.service';


@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('Wishlist')
    private wishlistModel: Model<any>,
  ) {}

  // ✅ Add to wishlist
  async addToWishlist(userId: string, productId: string) {
    try {
      const data = await this.wishlistModel.create({
        user: userId,
        product: productId,
      });

      return new CustomResponse(
        201,
        'Item added to wishlist',
        data,
      );
    } catch (err: any) {
      if (err?.code === 11000) {
        throw new CustomError(409, 'Item already in wishlist');
      }

      throw new CustomError(500, err.message || 'Failed to add to wishlist');
    }
  }

  // ✅ Get wishlist
  async getWishlist(userId: string) {
    try {
      const data = await this.wishlistModel
        .find({ user: userId })
        .populate('product')
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Wishlist fetched successfully',
        data,
      );
    } catch (err: any) {
      throw new CustomError(500, err.message || 'Failed to fetch wishlist');
    }
  }

  // ✅ Remove from wishlist
  async removeFromWishlist(userId: string, productId: string) {
    try {
      const data = await this.wishlistModel.findOneAndDelete({
        user: userId,
        product: productId,
      });

      if (!data) {
        throw new CustomError(404, 'Item not found in wishlist');
      }

      return new CustomResponse(
        200,
        'Item removed from wishlist',
        data,
      );
    } catch (err: any) {
      if (err instanceof CustomError) throw err;

      throw new CustomError(500, err.message || 'Failed to remove item');
    }
  }
}