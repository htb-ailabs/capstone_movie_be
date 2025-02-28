import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateCinemaDto {
  @IsString()
  ten_rap: string;

  @Optional()
  ma_cum_rap?: number;
}
