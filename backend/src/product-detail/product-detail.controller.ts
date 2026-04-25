import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Req
} from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { QueryProductDto } from './dto/query-product.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { OptionalAuthGuard } from 'src/auth/guards/optionalAuthGuard';


@Controller('product-detail')


export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) { }

  // your LAN IP (change if needed)
  private baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.SERVER_BASE_URL!
    : 'http://localhost:8000/';

  // @Post('AddProduct')
  // @UseInterceptors(AnyFilesInterceptor())
  // create(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Body() dto: CreateProductDetailDto,
  // ) {
  //   if (files?.length > 0) {
  //     dto.imageUrls = files.map(file => this.baseUrl + file.filename);
  //   }
  //   return this.productDetailService.create(dto);
  // }

  @Post('AddProduct')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreateProductDetailDto,
  ) {
    if (files?.length > 0) {
      dto.imageUrls = files.map(
        (file) => `${this.baseUrl}uploads/products/${file.filename}`,
      );
    }

    return this.productDetailService.create(dto);
  }

  @Get()
  @UseGuards(OptionalAuthGuard)
  findAll(@Req()req) {
    const userId = req.user?.id
    return this.productDetailService.findAll(userId);
  }
  @Get('searchProducts')
  async searchProducts(@Query() query: any) {
    
    return this.productDetailService.searchProducts(query);
  }
  @Get(':id')
  @UseGuards(OptionalAuthGuard)
  findOne(@Param('id') id: string,@Req()req) {
    const userId = req?.user?.id
    return this.productDetailService.findOne(id,userId);
  }



  // @Patch(':id')
  // @UseInterceptors(AnyFilesInterceptor())
  // update(
  //   @Param('id') id: string,
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Body() dto: UpdateProductDetailDto,
  // ) {
  //   if (files?.length > 0) {
  //     dto.imageUrls = files.map(file => this.baseUrl + file.filename);
  //   }
  //   return this.productDetailService.update(id, dto);
  // }

  @Patch(':id')
@UseInterceptors(
  AnyFilesInterceptor({
    storage: diskStorage({
      destination: './uploads/products',
      filename: (req, file, cb) => {
        const uniqueName =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + extname(file.originalname));
      },
    }),
  }),
)
update(
  @Param('id') id: string,
  @UploadedFiles() files: Array<Express.Multer.File>,
  @Body() dto: UpdateProductDetailDto,
) {
  if (files?.length > 0) {
    dto.imageUrls = files.map(
      (file) => `${this.baseUrl}uploads/products/${file.filename}`,
    );
  }

  return this.productDetailService.update(id, dto);
}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDetailService.remove(id);
  }
}
