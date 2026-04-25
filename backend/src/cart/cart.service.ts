import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart,CartDocument } from './cart.schema/cart.schema';
import { ProductDetail, ProductDetailDocument } from '../product-detail/entities/product-detail.entity';
import CustomError from 'src/common/providers/customer-error.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(ProductDetail.name)
    private productModel: Model<ProductDetailDocument>,
  ) {}

  // 🛒 Get cart
 async getCart(userId: string) {
  return this.cartModel
    .findOne({ user: userId })
    .populate('items.product')
    .exec();
}

  // ➕ Add to cart
  async addToCart(userId: string, productId: string, quantity = 1) {
  const product = await this.productModel.findById(productId);
  if (!product) throw new CustomError(404, 'Product not found');

  let cart = await this.cartModel.findOne({ user: userId });

  if (!cart) {
    cart = new this.cartModel({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
  existingItem.quantity += quantity;
} else {
  cart.items.push({
    product: new Types.ObjectId(productId),
    quantity,
  });
}

  const savedCart = await cart.save();

  return savedCart.populate('items.product'); // ✅ populate only here
}

  // 🔄 Update quantity
 async updateQuantity(userId: string, productId: string, quantity: number) {
  const cart = await this.cartModel.findOne({ user: userId });
  if (!cart) throw new CustomError(404, 'Cart not found');

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item) throw new CustomError(404, 'Item Not In Cart');

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (i) => i.product.toString() !== productId
    );
  } else {
    item.quantity = quantity;
  }

  const savedCart = await cart.save();
  return savedCart.populate('items.product');
}
  // ❌ Remove item
async removeItem(userId: string, productId: string) {
  const cart = await this.cartModel.findOne({ user: userId });
  if (!cart) throw new CustomError(404, 'Cart not found');

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  const savedCart = await cart.save();
  return savedCart.populate('items.product');
}

  // 🧹 Clear cart
  async clearCart(userId: string) {
    return this.cartModel.findOneAndUpdate(
      { user: userId }, // ✅ FIX
      { items: [] },
      { new: true },
    ).populate('items.product').exec();;
  }
}