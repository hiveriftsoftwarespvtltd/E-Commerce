import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';

import { Cart,CartSchema } from './cart.schema/cart.schema';
import {
  ProductDetail,
  ProductDetailSchema,
} from '../product-detail/entities/product-detail.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema }, // ✅ register Cart
      { name: ProductDetail.name, schema: ProductDetailSchema }, // ✅ register Product
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}