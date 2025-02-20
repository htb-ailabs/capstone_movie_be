import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CinemaController],
  providers: [CinemaService, PrismaService],
})
export class CinemaModule {}
