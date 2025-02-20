import { IsNumber, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  ma_rap: number;

  @IsNumber()
  ma_phim: number;

  @IsOptional()
  ngay_gio_chieu: string;

  @IsNumber()
  gia_ve: number;
}
