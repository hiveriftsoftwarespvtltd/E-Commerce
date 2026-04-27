  import { Controller, Get, Post, Body, Param } from '@nestjs/common';
  import { TransactionService } from './transaction.service';
  import { CreateTransactionDto } from './dto/transaction.dto';
  @Controller('transaction')
  export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    // ✅ PAYMENT (RAZORPAY)
  @Post('create-payment')
  async createPayment(@Body() dto: CreateTransactionDto) {
    return this.transactionService.createPayment(dto);
  }

  // ✅ VERIFY PAYMENT
  @Post('verify-payment')
  async verifyPayment(@Body() dto: any) {
    return this.transactionService.verifyPayment(dto);
  }

  // ✅ WALLET (rename to avoid confusion)
  @Post('wallet')
  async createWalletTransaction(@Body() dto: any) {
    return this.transactionService.createTransaction(dto);
  }

  // ✅ HISTORY
  @Get('history/:userId')
  async getTransactionHistory(@Param('userId') userId: string) {
    return this.transactionService.getTransactionHistory(userId);
  }
  }
