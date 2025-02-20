import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupCinemaDto } from './dto/create-group-cinema.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class CinemaService {
  constructor(private prisma: PrismaService) {}

  async create(createCinemaDto: CreateCinemaDto) {
    try {
      const { ten_rap, ma_cum_rap } = createCinemaDto;
      const stage = await this.prisma.rapphim.create({
        data: { ten_rap, ma_cum_rap },
      });

      return stage;
    } catch (error: unknown) {
      return error;
    }
  }

  async createGroupCinema(createGroupCinemaDto: CreateGroupCinemaDto) {
    try {
      const { ten_cum_rap, dia_chi } = createGroupCinemaDto;
      return await this.prisma.cumrap.create({
        data: { ten_cum_rap, dia_chi },
      });
    } catch (error: unknown) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.rapphim.findMany();
    } catch (error: unknown) {
      return error;
    }
  }

  async findGroupcinema() {
    try {
      return await this.prisma.cumrap.findMany();
    } catch (error: unknown) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const stage = await this.prisma.rapphim.findFirst({
        where: { ma_rap: id },
      });

      if (!stage) throw new NotFoundException(`No stage in cinema`);
      return stage;
    } catch (error: unknown) {
      return error;
    }
  }

  async update(id: number, updateCinemaDto: UpdateCinemaDto) {
    try {
      const { ten_rap, ma_cum_rap } = updateCinemaDto;
      const newStage = await this.prisma.rapphim.update({
        where: { ma_rap: id },
        data: { ten_rap: ten_rap, ma_cum_rap: ma_cum_rap },
      });

      if (!newStage) throw new NotFoundException(`No stage is updated`);
      return newStage;
    } catch (error: unknown) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.rapphim.delete({
        where: { ma_rap: id },
      });
    } catch (error: unknown) {
      return error;
    }
  }

  // lịch chiếu
  async createSchedule(createScheduleDto: CreateScheduleDto) {
    try {
      const { ma_rap, ma_phim, ngay_gio_chieu, gia_ve } = createScheduleDto;
      return await this.prisma.lichchieu.create({
        data: {
          ma_rap,
          ma_phim,
          ngay_gio_chieu,
          gia_ve,
        },
      });
    } catch (error: unknown) {
      return error;
    }
  }

  async getScheduleAll() {
    try {
      return await this.prisma.lichchieu.findMany();
    } catch (error: unknown) {
      return error;
    }
  }
}
