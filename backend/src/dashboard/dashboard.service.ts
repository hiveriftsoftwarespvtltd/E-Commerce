import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/interface/user.interface';
import { Product } from './schema/dashboard.schema';
import CustomResponse from 'src/common/providers/custom-response.service';
import CustomError from 'src/common/providers/customer-error.service';
import { Order } from './dto/dashboard.dto';
import { ProductDetail } from 'src/product-detail/entities/product-detail.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Order') private orderModel: Model<Order>,
    @InjectModel('ProductDetail') private productModel: Model<ProductDetail>, // ✅ FIXED
  ) {}

  async getDashboardStats() {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const [
        totalProducts,
        lowStockAlerts,
        totalCustomers,
        totalOrders,
        pendingOrders,
        processingOrders,
        completedOrders,
        todayOrders,
        recentOrders,
      ] = await Promise.all([
        this.productModel.countDocuments(),
        this.productModel.countDocuments({ stock: { $lt: 10 } }),
        this.userModel.countDocuments(),
        this.orderModel.countDocuments(),
        this.orderModel.countDocuments({ status: 'pending' }),
        this.orderModel.countDocuments({ status: 'processing' }),
        this.orderModel.countDocuments({ status: 'delivered' }),
        this.orderModel.find({
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        }),
        this.orderModel
          .find()
          .sort({ createdAt: -1 })
          .limit(4)
          .select('orderNumber totalAmount status createdAt'),
      ]);

      const todaysSales = todayOrders.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0,
      );

      return new CustomResponse(200, 'Dashboard stats loaded successfully', {
        totalProducts,
        totalOrders,
        todaysSales,
        lowStockAlerts,
        pendingOrders,
        processingOrders,
        completedOrders,
        totalCustomers,
        recentOrders,
      });

    } catch (error:any) {
      throw new CustomError(500, error.message);
    }
  }
}