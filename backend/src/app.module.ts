import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { RiderModule } from './rider/rider.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MenuModule } from './menu/menu-item/menu.module';
import { BannerModule } from './banner/banner.module';
import { InventoryModule } from './inventory/inventory.module';
import { SubcategoryModule } from './category/subcategory/subcategory.module';
import { APP_FILTER } from '@nestjs/core';
import { PlanModule } from './plan/plan.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { RazorpayService } from './razorpay/razorpay.service';
import { StoreController } from './store/store.controller';
import { StoreModule } from './store/store.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BankDetailModule } from './bank-details/bank-details.module';
import { RiderWalletModule } from './rider-wallet/rider-wallet.module';
import { RiderTransactionService } from './rider-transaction/rider-transaction.service';
import { RiderTransactionModule } from './rider-transaction/rider-transaction.module';
import { ProfileModule } from './profile/profile.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AddressModule } from './address/address.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });


@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.LOCAL_MOBGO_URI as string, {}),

    AuthModule,
    UserModule,
    OrderModule,
    CategoryModule,
    SubcategoryModule,
    PlanModule,
    RiderModule,
    MenuModule,
    BannerModule,
    InventoryModule,
    SubscriptionModule,
    WalletModule,
    TransactionModule,
    StoreModule,
    DashboardModule,
    BankDetailModule,
    RiderTransactionModule,
    RiderWalletModule,
    ProfileModule,
    ProductDetailModule,
    CartModule,
    WishlistModule,
    AddressModule,
  ],
  controllers: [AppController, StoreController],
  providers: [AppService, RazorpayService, RiderTransactionService],
})
export class AppModule {}
