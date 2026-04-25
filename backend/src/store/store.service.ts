import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Store, StoreDocument } from './schema/store.schema';
import { StoreDto, OrderStatus } from './dto/store.dto';
import { StoreFilterDto } from './dto/store-filter.dto';
import { fileUpload } from 'src/util/fileupload';
import CustomResponse from 'src/common/providers/custom-response.service';
import CustomError from 'src/common/providers/customer-error.service';
import { throwException } from 'src/util/errorhandling';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
    @InjectModel('Order') private orderModel: Model<any>,
  ) {}

  async createStoreOrder(storeDto: StoreDto, files: any) {
    try {
      if (!storeDto || Object.keys(storeDto).length === 0) {
        return new CustomResponse(HttpStatus.CONFLICT, 'Missing required fields');
      }

      storeDto.quantity = Number(storeDto.quantity);
      if (isNaN(storeDto.quantity)) {
        throw new BadRequestException('Quantity must be a number');
      }

      const webImage = files?.web_image?.[0] ? fileUpload('store/webImage', files.web_image[0]) : null;
      const appImage = files?.app_image?.[0] ? fileUpload('store/appImage', files.app_image[0]) : null;

      storeDto.webImage = webImage ? `${process.env.SERVER_BASE_URL}/uploads/store/webImage/${webImage}` : null;
      storeDto.appImage = appImage ? `${process.env.SERVER_BASE_URL}/uploads/store/appImage/${appImage}` : null;

      const order = await this.orderModel.findOne().sort({ createdAt: -1 }).exec();
      if (!order) return new CustomResponse(HttpStatus.BAD_REQUEST, 'Order data missing');

      const newOrder = new this.storeModel({
        ...storeDto,
        orderNumber: order.orderNumber.toString(), // string now
        finalAmount: order.finalAmount,
      });

      const savedOrder = await newOrder.save();
      return new CustomResponse(HttpStatus.OK, 'Store Order Saved Successfully', savedOrder);
    } catch (error) {
      throwException(error);
    }
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const updatedOrder = await this.storeModel.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) return new CustomError(404, 'Order not found');
    return updatedOrder;
  }

  async deleteStoreOrders(id: string) {
    const store = await this.storeModel.findById(id).exec();
    if (!store) return new CustomResponse(404, 'Store not found');
    const deleted = await this.storeModel.findByIdAndDelete(id).exec();
    return new CustomResponse(200, 'Store orders deleted successfully', deleted);
  }

  async getFilteredStores(filters: StoreFilterDto) {
    try {
      const query: any = {};
      for (const [key, value] of Object.entries(filters)) {
        if (!value) continue;
        if (key === 'userId' && Types.ObjectId.isValid(value)) query._id = new Types.ObjectId(value);
        else query[key] = { $regex: value, $options: 'i' };
      }
      const stores = await this.storeModel.find(query).exec();
      if (!stores.length) return new CustomResponse(HttpStatus.NOT_FOUND, 'No Stores Found');
      return new CustomResponse(200, 'Stores retrieved successfully', stores);
    } catch (error) {
      throwException(error);
    }
  }

  async getStoreOrderByOrderNumber(orderNumber: string) {
    try {
      const order = await this.storeModel.findOne({ orderNumber }).exec();
      if (!order) return new CustomResponse(HttpStatus.NOT_FOUND, 'No order found.');
      return new CustomResponse(HttpStatus.OK, 'Order found successfully.', order);
    } catch (error) {
      throwException(error);
    }
  }

  async getAllOrder() {
    try {
      const stores = await this.storeModel.find();
      if (!stores.length) return new CustomResponse(HttpStatus.NOT_FOUND, 'No Stores found.');
      return new CustomResponse(HttpStatus.OK, 'Stores found successfully.', stores);
    } catch (error) {
      throw new CustomError(500, error);
    }
  }
}
