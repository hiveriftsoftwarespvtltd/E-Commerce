import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { UpdateOrderStatusDto } from './dto/update-order-dto';
import CustomError from 'src/common/providers/customer-error.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @Get()
  getAll() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
  
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: any) {
    const status = body?.status;
    const paymentStatus = body?.paymentStatus;

    if (!status && !paymentStatus) {
      throw new CustomError(
        400,
        'Either order status or payment status must be provided',
      );
    }

    return this.orderService.updateOrderStatusOrPayment(id, {
      status,
      paymentStatus,
      trackingNumber: body?.trackingNumber,
    });
  }

  @Get(':id/payment-status')
  getPaymentStatus(@Param('id') id: string) {
    return this.orderService.getPaymentStatus(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
