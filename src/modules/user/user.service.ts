import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { nguoidung } from '@prisma/client';
import { CheckUserDto } from './dto/check-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import {
//   REFRESH_TOKEN_EXPIRED,
//   ACCESS_TOKEN_SECRET,
//   ACCESS_TOKEN_EXPIRED,
//   REFRESH_TOKEN_SECRET,
// } from 'src/common/constant/app.constant';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    public prisma: PrismaService,
    private jwt: JwtService,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.nguoidung.findFirst({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException(`Email already exists`);
    }

    const { ho_ten, mat_khau, email, so_dt, loai_nguoi_dung } = createUserDto;

    // ma hoa password
    const passHash = bcrypt.hashSync(mat_khau, 10);
    // bước 3: tạo người dùng mới
    const userNew = await this.prisma.nguoidung.create({
      data: {
        ho_ten,
        mat_khau: passHash,
        email,
        so_dt,
        loai_nguoi_dung,
      },
    });
    // xoa password khi tra ve de khong bi hack
    // delete userNew.mat_khau;

    return userNew;
  }

  async findAll() {
    const user = await this.prisma.nguoidung.findMany();
    if (user.length === 0) {
      throw new NotFoundException(`There is no user`);
    }
    return user;
  }

  async findOne(id: number) {
    const existingUser = await this.prisma.nguoidung.findUnique({
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

  async login(checkUserDto: CheckUserDto) {
    return this.authService.login(checkUserDto);
    // try {
    //   const { email, mat_khau } = checkUserDto;
    //   const userExists = await this.prisma.nguoidung.findFirst({
    //     where: { email },
    //   });

    //   if (!userExists || !userExists.mat_khau) {
    //     throw new BadGatewayException(`Invalid credentials`);
    //   }

    //   const isPasswordValid =
    //     userExists?.mat_khau &&
    //     (await bcrypt.compare(mat_khau, userExists.mat_khau));
    //   if (!isPasswordValid) {
    //     throw new UnauthorizedException('Invalid credentials');
    //   }

    //   const tokens = this.createTokens(userExists.tai_khoan);
    //   console.log(tokens);

    //   return tokens;
    // } catch (error) {
    //   return error;
    // }
  }

  logout(userId: number) {
    return this.authService.logout(userId);
  }

  async searchAll(ho_ten: string) {
    try {
      console.log(ho_ten);
      const users = await this.prisma.nguoidung.findMany({
        where: { ho_ten: { contains: ho_ten } },
      });

      if (!users || users.length === 0)
        throw new NotFoundException(`User not found`);
      return users;
    } catch (error) {
      return error.response;
    }
  }

  // function
  // createTokens(userId: number) {
  //   if (!userId) throw new BadRequestException(`kg co userId de tao token`);
  //   const accessToken = this.jwt.sign(
  //     { userId: userId },
  //     {
  //       expiresIn: ACCESS_TOKEN_EXPIRED,
  //       secret: ACCESS_TOKEN_SECRET,
  //     },
  //   );

  //   const refreshToken = this.jwt.sign(
  //     { userId: userId },
  //     {
  //       expiresIn: REFRESH_TOKEN_EXPIRED,
  //       secret: REFRESH_TOKEN_SECRET,
  //     },
  //   );

  //   return { accessToken: accessToken, refreshToken: refreshToken };
  // }
}
