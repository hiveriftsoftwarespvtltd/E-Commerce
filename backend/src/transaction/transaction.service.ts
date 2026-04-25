import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction } from './schema/transaction.schema';
import { CreateTransactionDto } from './dto/transaction.dto';
import CustomResponse from 'src/common/providers/custom-response.service';
import CustomError from 'src/common/providers/customer-error.service';
import { RazorpayService } from './razorpay.service';
import { Order } from 'src/order/order.schema/order.schema';

 


@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,

    @InjectModel('Order')
    private orderModel: Model<Order>,

    private razorpayService: RazorpayService,
  ) {}

  // 🔹 CREATE PAYMENT
  async createPayment(dto: CreateTransactionDto) {
    try {
      if (!Types.ObjectId.isValid(dto.userId) || !Types.ObjectId.isValid(dto.orderId)) {
        throw new CustomError(400, 'Invalid IDs');
      }

      const order = await this.orderModel.findById(dto.orderId);
      if (!order) throw new CustomError(404, 'Order not found');

      // ✅ create Razorpay order
      const razorpayOrder = await this.razorpayService.createOrder(
        order.totalAmount,
        order.orderNumber,
      );

      // ✅ store transaction
      const transaction = await this.transactionModel.create({
        user: new Types.ObjectId(dto.userId),
        order: order._id,
        amount: order.totalAmount,
        paymentMethod: dto.paymentMethod,
        gateway: 'razorpay',
        gatewayOrderId: razorpayOrder.id,
        status: 'PENDING',
      });

      return new CustomResponse(200, 'Payment initiated', {
        razorpayOrder,
        transactionId: transaction._id,
      });

    } catch (error: any) {
      throw error instanceof CustomError
        ? error
        : new CustomError(500, error.message);
    }
  }

  // 🔹 VERIFY PAYMENT
  async verifyPayment(dto: any) {
    try {
      const isValid = this.razorpayService.verifySignature(dto);
      if (!isValid) throw new CustomError(400, 'Invalid signature');

      const transaction = await this.transactionModel.findOne({
        gatewayOrderId: dto.razorpay_order_id,
      });

      if (!transaction) throw new CustomError(404, 'Transaction not found');

      transaction.status = 'SUCCESS';
      transaction.gatewayTransactionId = dto.razorpay_payment_id;
      transaction.signature = dto.razorpay_signature;
      transaction.paidAt = new Date();

      await transaction.save();

      await this.orderModel.findByIdAndUpdate(transaction.order, {
        paymentStatus: 'paid',
        status: 'processing',
      });

      return new CustomResponse(200, 'Payment successful');

    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  }

  // 🔹 HISTORY
  async getTransactionHistory(userId: string) {
    try {
      const transactions = await this.transactionModel
        .find({ user: userId })
        .sort({ createdAt: -1 })
        .lean();

      return new CustomResponse(200, 'Transactions fetched', transactions);

    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  }

  async createTransaction(dto: any) {
  try {
    const transaction = await this.transactionModel.create({
      user: new Types.ObjectId(dto.userId),
      amount: dto.amount,
      paymentMethod: 'WALLET',
      status: 'SUCCESS',
      metadata: { type: dto.type }, // credit/debit
    });

    return new CustomResponse(
      201,
      'Wallet transaction created',
      transaction,
    );

  } catch (error: any) {
    throw new CustomError(500, error.message);
  }
}
}