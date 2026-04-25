import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';
import CustomError from 'src/common/providers/customer-error.service';
import CustomResponse from 'src/common/providers/custom-response.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // 🛒 Get cart
  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    try {
      const cart = await this.cartService.getCart(userId);

      return new CustomResponse(
        200,
        "Cart fetched successfully",
        cart || []
      );
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  // ➕ Add to cart
  @Post('add')
  async addToCart(@Body() body: any) {
    try {
      const cart = await this.cartService.addToCart(
        body.userId,
        body.productId,
        body.quantity || 1,
      );

      return new CustomResponse(200, "Item added to cart", cart);
    } catch (error) {
      throw new CustomError(400, error.message);
    }
  }

  // 🔄 Update quantity
  @Patch('update')
  async updateQuantity(@Body() body: any) {
    try {
      const cart = await this.cartService.updateQuantity(
        body.userId,
        body.productId,
        body.quantity,
      );

      return new CustomResponse(200, "Cart updated", cart);
    } catch (error) {
      throw new CustomError(400, error.message);
    }
  }

  // ❌ Remove item
  @Delete('remove')
  async removeItem(@Body() body: any) {
    try {
      const cart = await this.cartService.removeItem(
        body.userId,
        body.productId,
      );

      return new CustomResponse(200, "Item removed", cart);
    } catch (error) {
      throw new CustomError(400, error.message);
    }
  }

  // 🧹 Clear cart
  @Delete('clear/:userId')
  async clearCart(@Param('userId') userId: string) {
    try {
      const cart = await this.cartService.clearCart(userId);

      return new CustomResponse(200, "Cart cleared", cart);
    } catch (error) {
      throw new CustomError(400, error.message);
    }
  }
}