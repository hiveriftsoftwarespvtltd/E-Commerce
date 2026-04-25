import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDetailService } from './product-detail.service';
import { ProductDetailController } from './product-detail.controller';
import { ProductDetail, ProductDetailSchema } from './entities/product-detail.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { WishlistModule } from 'src/wishlist/wishlist.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductDetail.name, schema: ProductDetailSchema },
    ]),
     WishlistModule,

    MulterModule.register({
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));  // keep extension!
        },
      }),
    }),
  ],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
  exports:[MongooseModule]
})
export class ProductDetailModule {}
