import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WishListSchema } from './wishlist.schema/wishlist.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:"Wishlist",schema:WishListSchema}
  ])],
  providers: [WishlistService],
  controllers: [WishlistController],
  exports:[WishlistService,MongooseModule]
})
export class WishlistModule {}
