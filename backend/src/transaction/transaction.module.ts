import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './schema/transaction.schema';
import { WalletModule } from '../wallet/wallet.module';
import { Wallet, WalletSchema } from '../wallet/schema/wallet.schema';
import { OrderSchema } from 'src/order/order.schema/order.schema';
import { RazorpayModule } from 'src/razorpay/razorpay.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
    ]),
    forwardRef(() => WalletModule),
    RazorpayModule, // ✅ correct usage
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService], // ✅ FIXED
})
export class TransactionModule {}