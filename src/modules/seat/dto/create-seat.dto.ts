import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateSeatDto {
  @IsString()
  ten_ghe: string;

  @IsString()
  loai_ghe: string;

  @Optional()
  ma_rap: number;
}
