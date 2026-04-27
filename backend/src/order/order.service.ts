import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order-dto';
import CustomResponse from 'src/common/providers/custom-response.service';
import CustomError from 'src/common/providers/customer-error.service';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<any>) {}

  async createOrder(dto: CreateOrderDto) {
    try {
      if (!Types.ObjectId.isValid(dto.userId)) {
        throw new CustomError(400, 'Invalid user ID');
      }

      if (!dto.items?.length) {
        throw new CustomError(400, 'Order must contain items');
      }

      const orderNumber = `ORD-${Date.now()}`;

      const userLocation = [
        Number(dto.userLongitude),
        Number(dto.userLatitude),
      ];

      const newOrder = await this.orderModel.create({
        orderNumber,
        user: new Types.ObjectId(dto.userId),
        items: dto.items,
        subtotal: dto.subtotal,
        shipping: dto.shipping ?? 0,
        tax: dto.tax ?? 0,
        totalAmount: dto.totalAmount,
        paymentMethod: dto.paymentMethod,
        paymentStatus: 'pending',
        shippingAddress: dto.shippingAddress,
        userLocation: { type: 'Point', coordinates: userLocation },
        status: 'pending',
        contact: {
    phone: dto.phone,
    email: dto.email,
  },
      });

      const populatedOrder = await this.orderModel
      .findById(newOrder._id)
      .populate('user', '-password -__v');

      return new CustomResponse(201, 'Order created successfully', populatedOrder);

    } catch (error: any) {
      throw error instanceof CustomError
        ? error
        : new CustomError(500, error.message);
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.orderModel
        .find()
        .populate('user', 'userName userEmail')
        .sort({ createdAt: -1 })
        .lean();


      const formatted = orders.map((order: any) => ({
        _id: order._id,
        orderNumber: order.orderNumber,
        customer: {
          name: order.user?.userName || 'Unknown',
          email: order.user?.userEmail || 'N/A',
        },
        itemsCount: order.items?.length || 0,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        status: order.status,
        paymentStatus: order.paymentStatus,
        date: order.createdAt?.toISOString().split('T')[0],
      }));

      return new CustomResponse(200, 'Orders fetched', formatted);

    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  }

   async getUserOrders(userId:string) {
    try {
      const orders = await this.orderModel
        .find({user:userId})
        .sort({ createdAt: -1 })
        .lean();


      return new CustomResponse(200, 'Orders fetched', orders);

    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  }

  async getOrderById(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid order ID');
      }

      const order = await this.orderModel
        .findById(id)
        .populate('user', 'name email phone');

      if (!order) throw new CustomError(404, 'Order not found');

      return new CustomResponse(200, 'Order fetched', order);

    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  }

  async updateOrderStatusOrPayment(id: string, dto: any) {
    try {
      const order = await this.orderModel.findById(id);
      if (!order) throw new CustomError(404, 'Order not found');

      if (dto.status) {
        const valid = ['pending','processing','shipped','delivered','cancelled'];
        if (!valid.includes(dto.status)) {
          throw new CustomError(400, 'Invalid order status');
        }
        order.status = dto.status;
      }

      if (dto.paymentStatus) {
        const valid = ['pending','paid','failed','refunded'];
        if (!valid.includes(dto.paymentStatus)) {
          throw new CustomError(400, 'Invalid payment status');
        }
        order.paymentStatus = dto.paymentStatus;
      }

      if (dto.trackingNumber !== undefined) {
        order.trackingNumber = dto.trackingNumber?.trim() || undefined;
      }

      await order.save();

      return new CustomResponse(200, 'Order updated', order);

    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  }

  async getPaymentStatus(id: string) {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError(400, 'Invalid order ID');
    }

    const order = await this.orderModel.findById(id);
    if (!order) throw new CustomError(404, 'Order not found');

    return new CustomResponse(200, 'Payment status fetched', {
      orderId: order._id,
      paymentStatus: order.paymentStatus,
    });

  } catch (error: any) {
    throw new CustomError(500, error.message);
  }
}

async deleteOrder(id: string) {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError(400, 'Invalid order ID');
    }

    const deleted = await this.orderModel.findByIdAndDelete(id);
    if (!deleted) throw new CustomError(404, 'Order not found');

    return new CustomResponse(200, 'Order deleted successfully');

  } catch (error: any) {
    throw new CustomError(500, error.message);
  }
}
}