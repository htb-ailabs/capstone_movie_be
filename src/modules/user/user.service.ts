import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { nguoidung } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(public prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.nguoidung.findFirst({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException(`Email already exists`);
    }

    const { ho_ten, mat_khau, email, so_dt, loai_nguoi_dung } = createUserDto;
    return await this.prisma.nguoidung.create({
      data: {
        ho_ten,
        mat_khau,
        email,
        so_dt,
        loai_nguoi_dung,
      },
    });
  }

  async findAll() {
    const user = await this.prisma.nguoidung.findMany();
    if (user.length === 0) {
      throw new NotFoundException(`There is no user`);
    }
    return user;
  }

  async findOne(id: number) {
    const existingUser = await this.prisma.nguoidung.findFirst({
      where: {
        tai_khoan: id,
      },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id = ${id} is not found`);
    }
    return existingUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<nguoidung> {
    try {
      const { ho_ten, mat_khau, email, so_dt, loai_nguoi_dung } = updateUserDto;
      const user = await this.prisma.nguoidung.update({
        where: { tai_khoan: id },
        data: { ho_ten, mat_khau, email, so_dt, loai_nguoi_dung },
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number): Promise<nguoidung> {
    try {
      return await this.prisma.nguoidung.delete({
        where: { tai_khoan: id },
      });
    } catch (error) {
      return error;
    }
  }
}
