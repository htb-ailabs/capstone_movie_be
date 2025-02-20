import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from '../prisma/prisma.service';
import { error } from 'console';
import { response } from 'express';

@Injectable()
export class MovieService {
  constructor(public prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      const {
        ten_phim,
        trailer,
        hinh_anh,
        mo_ta,
        ngay_khoi_chieu,
        danh_gia,
        hot,
        dang_chieu,
        sap_chieu,
      } = createMovieDto;

      const movie = await this.prisma.phim.create({
        data: {
          ten_phim,
          trailer,
          hinh_anh,
          mo_ta,
          ngay_khoi_chieu: ngay_khoi_chieu ?? null,
          danh_gia,
          hot,
          dang_chieu,
          sap_chieu,
        },
      });
      return movie;
    } catch (error) {
      return error;
    }
  }

  async searchItems(name: string) {
    try {
      const movies = await this.prisma.phim.findMany({
        where: {
          ten_phim: { contains: name },
        },
      });

      if (movies.length === 0)
        throw new NotFoundException(`No items found matching: ${name}`);
      return movies;
    } catch (error: unknown) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.phim.findMany();
    } catch (error: unknown) {
      return error;
    }
  }

  async findAllPages(query: any) {
    try {
      let { page, pageSize, type_id, search } = query;

      // LIMIT 5 OFFSSET 5
      type_id = +type_id > 0 ? +type_id : 0;
      search = search || ``;
      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 5;

      const whereTypeId = type_id === 0 ? {} : { ma_phim: type_id };
      const whereSearch =
        search.trim() === `` ? {} : { ten_phim: { contains: search } };
      const where = { ...whereTypeId, ...whereSearch };

      const totalItem = await this.prisma.phim.count({ where: where });
      const totalPage = Math.ceil(totalItem / pageSize);

      // console.log({ page, pageSize, type_id, search });
      const skip = (page - 1) * pageSize;
      const movies = await this.prisma.phim.findMany({
        take: pageSize,
        skip: skip,
        orderBy: {
          created_at: `desc`, // sap xet giam dan
        },
        where: where,
      });
      // console.log({ userDayne: req.user });
      return {
        page,
        pageSize,
        totalPage,
        totalItem,
        items: movies || [],
      };
    } catch (error: unknown) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const movie = await this.prisma.phim.findFirst({
        where: { ma_phim: id },
      });
      console.log(movie);
      if (!movie) {
        try {
          throw new NotFoundException('User not found'); // Simulating an exception
        } catch (error) {
          if (error instanceof NotFoundException) {
            return error.getResponse(); // ✅ Get response object
          }
        }
      }

      return movie;
    } catch (error: unknown) {
      return error;
    }
    return `This action returns a #${id} movie`;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    try {
      const {
        ten_phim,
        trailer,
        hinh_anh,
        mo_ta,
        ngay_khoi_chieu,
        danh_gia,
        hot,
        dang_chieu,
        sap_chieu,
      } = updateMovieDto;

      const videoUpdate = await this.prisma.phim.update({
        where: { ma_phim: id },
        data: {
          ten_phim,
          trailer,
          hinh_anh,
          mo_ta,
          ngay_khoi_chieu,
          danh_gia,
          hot,
          dang_chieu,
          sap_chieu,
        },
      });

      if (!videoUpdate) {
        try {
          throw new NotFoundException('Film not found'); // Simulating an exception
        } catch (error) {
          if (error instanceof NotFoundException) {
            return error.getResponse(); // ✅ Get response object
          }
        }
      }

      return videoUpdate;
    } catch (error: unknown) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.phim.delete({
        where: { ma_phim: id },
      });
    } catch (error: unknown) {
      return error;
    }
  }
}
