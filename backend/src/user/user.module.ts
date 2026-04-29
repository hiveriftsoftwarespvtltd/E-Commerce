import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { Address, AddressSchema } from './user.schema/address.schema';
import { OrderSchema } from 'src/order/order.schema/order.schema';
import { WishListSchema } from 'src/wishlist/wishlist.schema/wishlist.schema';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [
    AddressModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Wishlist', schema: WishListSchema }]),
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]), 
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, MongooseModule], 
})
export class UserModule {}
