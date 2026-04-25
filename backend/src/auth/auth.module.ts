// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport'; 
import { UserSchema } from 'src/user/user.schema/user.schema';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './local.strategy/jwt.strategy';
import { RiderModule } from 'src/rider/rider.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-falllback', 
      signOptions: { expiresIn: '24h' }, 
    }),

    forwardRef(() => UserModule),
    RiderModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule], 
})
export class AuthModule {}