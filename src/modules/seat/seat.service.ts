import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeatService {
  constructor(public prisma: PrismaService) {}

  async create(createSeatDto: CreateSeatDto) {
    try {
      const { ten_ghe, loai_ghe, ma_rap } = createSeatDto;
      return await this.prisma.ghe.create({
        data: { ten_ghe, loai_ghe, ma_rap },
      });
    } catch (error: unknown) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.ghe.findMany();
    } catch (error: unknown) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const seat = await this.prisma.ghe.findFirst({
        where: { ma_ghe: id },
      });
      if (!seat) throw new NotFoundException(`No seat`);
      return seat;
    } catch (error: unknown) {
      return error;
    }
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) {
    try {
      const { ten_ghe, loai_ghe, ma_rap } = updateSeatDto;
      const seatUpdate = await this.prisma.ghe.update({
        where: { ma_ghe: id },
        data: {
          ten_ghe,
          loai_ghe,
          ma_rap,
        },
      });

      if (!seatUpdate) throw new NotFoundException(`No seat is updated`);
      return seatUpdate;
    } catch (error: unknown) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.ghe.delete({ where: { ma_ghe: id } });
    } catch (error: unknown) {
      return error;
    }
  }
}
