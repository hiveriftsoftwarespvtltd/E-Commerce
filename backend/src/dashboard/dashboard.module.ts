import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from '../user/user.schema/user.schema';
import { OrderSchema } from '../order/order.schema/order.schema';

// ✅ IMPORTANT IMPORT


import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ProductDetailModule } from 'src/product-detail/product-detail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Order', schema: OrderSchema },

      // ✅ THIS LINE FIXES YOUR ERROR
    ]),
    ProductDetailModule
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}