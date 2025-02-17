import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  ho_ten: string;

  @IsString()
  @MinLength(3)
  mat_khau: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  so_dt?: string;

  @IsString()
  loai_nguoi_dung?: string;
}
