import { Module } from '@nestjs/common';
import { TiketService } from './tiket.service';
import { TiketController } from './tiket.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TiketController],
  providers: [TiketService, PrismaService],
})
export class TiketModule {}
