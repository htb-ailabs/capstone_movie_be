import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  ho_ten?: string;

  @IsOptional()
  @MinLength(3)
  mat_khau?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  so_dt?: string;

  @IsOptional()
  loai_nguoi_dung?: string;
}
