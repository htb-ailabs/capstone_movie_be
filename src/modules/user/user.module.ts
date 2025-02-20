import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule], // ✅ Include AuthModule
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, AuthService],
})
export class UserModule {}
