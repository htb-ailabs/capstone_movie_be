import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  ten_phim: string;

  @Optional()
  trailer?: string;

  @Optional()
  hinh_anh?: string;

  @Optional()
  mo_ta?: string;

  @Optional()
  ngay_khoi_chieu?: string;

  @Optional()
  danh_gia?: number;

  @Optional()
  hot?: boolean;

  @Optional()
  dang_chieu?: boolean;

  @Optional()
  sap_chieu?: boolean;
}
