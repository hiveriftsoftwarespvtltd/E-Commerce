import { Controller, Post, Patch, Body, Param, UploadedFiles, UseInterceptors, Query, Delete, Get } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { StoreService } from './store.service';
import { StoreDto } from './dto/store.dto';
import { UpdateOrderDto } from './dto/update-order-dto';
import { StoreFilterDto } from './dto/store-filter.dto';
import { OrderStatus } from './dto/store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'web_image', maxCount: 1 },
      { name: 'app_image', maxCount: 1 },
    ]),
  )
  async createStoreOrder(
    @Body() storeDto: StoreDto,
    @UploadedFiles() files: { web_image?: Express.Multer.File[]; app_image?: Express.Multer.File[] },
  ) {
    return this.storeService.createStoreOrder(storeDto, files);
  }

  @Patch('update-status/:orderId')
  async updateOrderStatus(@Param('orderId') orderId: string, @Body() updateDto: UpdateOrderDto) {
    return this.storeService.updateOrderStatus(orderId, updateDto.status);
  }

  @Get('filters')
  async getFilteredStores(@Query() filterDto: StoreFilterDto) {
    return this.storeService.getFilteredStores(filterDto);
  }

  @Delete(':id')
  async deleteStoreOrders(@Param('id') id: string) {
    return this.storeService.deleteStoreOrders(id);
  }

  @Get('/getStoreByOrderNumber/:orderNumber')
  async getOrder(@Param('orderNumber') orderNumber: string) {
    return this.storeService.getStoreOrderByOrderNumber(orderNumber);
  }

  @Get('getAllOrder')
  async getAllOrder() {
    return this.storeService.getAllOrder();
  }
}
