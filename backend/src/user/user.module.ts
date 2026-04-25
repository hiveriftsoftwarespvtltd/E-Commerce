import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { Address, AddressSchema } from './user.schema/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), 
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]), 
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, MongooseModule], 
})
export class UserModule {}
