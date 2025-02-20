import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CheckUserDto } from '../user/dto/check-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constant/app.constant';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(checkUserDto: CheckUserDto) {
    const user = await this.prisma.nguoidung.findFirst({
      where: { email: checkUserDto.email },
    });
    if (!user) throw new UnauthorizedException(`Invalid credentials`);

    const isPasswordValid = await bcrypt.compare(
      checkUserDto.mat_khau,
      user.mat_khau,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException(`Invalid credentials`);

    return user;
  }

  async login(checkUserDto: CheckUserDto) {
    console.log(`login from authorization service`);
    const user = await this.validateUser(checkUserDto);
    const tokens = this.getTokens(user.tai_khoan, user.email);
    await this.updateRefreshToken(user.tai_khoan, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: number) {
    try {
      console.log(`logout`);
      await this.prisma.nguoidung.update({
        where: { tai_khoan: userId },
        data: { refreshToken: null },
      });

      return `User logout successfully`;
    } catch (error) {
      return `${error.meta.cause}`;
    }
  }

  private getTokens(userId: number, email: string) {
    // const payload = { sub: userId, email };
    const accessToken = this.jwt.sign(
      { userId: userId, email: email },
      {
        expiresIn: ACCESS_TOKEN_EXPIRED,
        secret: ACCESS_TOKEN_SECRET,
      },
    );

    const refreshToken = this.jwt.sign(
      { userId: userId },
      {
        expiresIn: REFRESH_TOKEN_EXPIRED,
        secret: REFRESH_TOKEN_SECRET,
      },
    );

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.prisma.nguoidung.update({
      where: { tai_khoan: userId },
      data: { refreshToken: hash },
    });
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.prisma.nguoidung.findFirst({
      where: { tai_khoan: userId },
    });
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException(`Invalid refresh token`);
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) throw new UnauthorizedException(`Invalid refresh token`);

    const tokens = await this.getTokens(user.tai_khoan, user.email);
    await this.updateRefreshToken(user.tai_khoan, tokens.refreshToken);

    return tokens;
  }
}
