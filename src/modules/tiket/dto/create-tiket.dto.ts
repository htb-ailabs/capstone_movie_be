import { IsNumber } from 'class-validator';

export class CreateTiketDto {
  @IsNumber()
  tai_khoan: number;

  @IsNumber()
  ma_lich_chieu: number;

  @IsNumber()
  ma_ghe: number;
}
