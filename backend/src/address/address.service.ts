import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
import { Address } from './schema/address.schema';
import CustomResponse from 'src/common/providers/custom-response.service';
import CustomError from 'src/common/providers/customer-error.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: Model<Address>,
  ) {}

  // 🔧 COMMON VALIDATION
  private validateFields(dto: any, isUpdate = false) {
    const requiredFields = ["line1", "phone1", "pincode", "city", "state"];

    const invalidFields = requiredFields.filter((field) => {
      if (isUpdate) {
        return field in dto && (!dto[field] || dto[field].toString().trim() === "");
      }
      return !dto[field] || dto[field].toString().trim() === "";
    });

    if (invalidFields.length > 0) {
      throw new CustomError(
        400,
        `Missing/invalid field(s): ${invalidFields.join(", ")}`
      );
    }
  }

  // ✅ Create Address
  async create(userId: string, dto: any) {
    try {
      if (!isValidObjectId(userId)) {
        throw new CustomError(400, "Invalid user id");
      }

      this.validateFields(dto);

      const address = await this.addressModel.create({
        ...dto,
        user: new Types.ObjectId(userId),
      });

      return new CustomResponse(201, 'Address created successfully', address);

    } catch (err: any) {
      console.log("Create address error", err.message);

      if (err instanceof CustomError) throw err;

      throw new CustomError(500, err.message || "Failed to create address");
    }
  }

  // ✅ Get all addresses
  async getUserAddresses(userId: string) {
    try {
      if (!isValidObjectId(userId)) {
        throw new CustomError(400, "Invalid user id");
      }

      const addresses = await this.addressModel
        .find({ user: new Types.ObjectId(userId) })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'User addresses fetched successfully',
        addresses || [],
      );

    } catch (err) {
      if (err instanceof CustomError) throw err;
      throw new CustomError(500, 'Failed to fetch addresses');
    }
  }

  // ✅ Get single address
  async getById(id: string, userId: string) {
    try {
      if (!isValidObjectId(id) || !isValidObjectId(userId)) {
        throw new CustomError(400, "Invalid id");
      }

      const address = await this.addressModel.findOne({
        _id: new Types.ObjectId(id),
        user: new Types.ObjectId(userId),
      });

      if (!address) {
        throw new CustomError(404, 'Address not found');
      }

      return new CustomResponse(
        200,
        'Address fetched successfully',
        address,
      );

    } catch (err) {
      if (err instanceof CustomError) throw err;
      throw new CustomError(500, 'Failed to fetch address');
    }
  }

  // ✅ Update Address (FIXED)
  async update(id: string, userId: string, dto: any) {
    try {
      if (!isValidObjectId(id) || !isValidObjectId(userId)) {
        throw new CustomError(400, "Invalid id");
      }

      // ✅ Validate only provided fields
      this.validateFields(dto, true);

      // ❗ REMOVE user field from DTO (CRITICAL FIX)
      const { user, ...safeDto } = dto;

      const updated = await this.addressModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          user: new Types.ObjectId(userId),
        },
        safeDto,
        { new: true }
      );

      if (!updated) {
        throw new CustomError(404, 'Address not found or unauthorized');
      }

      return new CustomResponse(
        200,
        'Address updated successfully',
        updated,
      );

    } catch (err:any) {
      if (err instanceof CustomError) throw err;
      throw new CustomError(500, err.message || 'Failed to update address');
    }
  }

  // ✅ Delete Address
  async delete(id: string, userId: string) {
    try {
      if (!isValidObjectId(id) || !isValidObjectId(userId)) {
        throw new CustomError(400, "Invalid id");
      }

      const deleted = await this.addressModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
        user: new Types.ObjectId(userId),
      });

      if (!deleted) {
        throw new CustomError(404, 'Address not found or unauthorized');
      }

      return new CustomResponse(200, 'Address deleted successfully', null);

    } catch (err) {
      if (err instanceof CustomError) throw err;
      throw new CustomError(500, 'Failed to delete address');
    }
  }
}