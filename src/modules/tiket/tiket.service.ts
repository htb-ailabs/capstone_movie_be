import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TiketService {
  constructor(public prisma: PrismaService) {}

  async create(createTiketDto: CreateTiketDto) {
    try {
      const { tai_khoan, ma_ghe, ma_lich_chieu } = createTiketDto;
      return await this.prisma.datve.create({
        data: { tai_khoan, ma_ghe, ma_lich_chieu },
      });
    } catch (error: unknown) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.datve.findMany();
    } catch (error: unknown) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const tiket = await this.prisma.datve.findFirst({
        where: { ma_ve: id },
      });

      if (!tiket) throw new NotFoundException(`No tiket`);
      return tiket;
    } catch (error: unknown) {
      return error;
    }
  }

  async update(id: number, updateTiketDto: UpdateTiketDto) {
    try {
      const { ma_ghe, ma_lich_chieu, tai_khoan } = updateTiketDto;
      const tiketUpdate = await this.prisma.datve.update({
        where: { ma_ve: id },
        data: { ma_ghe, ma_lich_chieu, tai_khoan },
      });

      if (!tiketUpdate) throw new NotFoundException(`No tiket updated`);
      return tiketUpdate;
    } catch (error: unknown) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.datve.delete({
        where: {
          ma_ve: id,
        },
      });
    } catch (error: unknown) {
      return error;
    }
  }
}
