// src/order/order.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderSchema } from './order.schema/order.schema';
import { SubcategoryModule } from 'src/category/subcategory/subcategory.module';
import { RazorpayModule } from 'src/razorpay/razorpay.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    SubcategoryModule,
    RazorpayModule,
    UserModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService, MongooseModule],
})
export class OrderModule {}
