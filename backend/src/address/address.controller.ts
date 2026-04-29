import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('address')
@UseGuards(AuthGuard('jwt')) // ✅ APPLY HERE
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Req() req: any, @Body() dto: any) {
    return this.addressService.create(req.user.id, dto);
  }

  @Get()
  getUserAddresses(@Req() req: any) {
    return this.addressService.getUserAddresses(req.user.id);
  }

  @Get(':id')
getById(@Param('id') id: string, @Req() req: any) {
  return this.addressService.getById(id, req.user.id);
}

@Patch(':id')
update(@Param('id') id: string, @Req() req: any, @Body() dto: any) {
  return this.addressService.update(id, req.user.id, dto);
}

@Delete(':id')
delete(@Param('id') id: string, @Req() req: any) {
  return this.addressService.delete(id, req.user.id);
}
}