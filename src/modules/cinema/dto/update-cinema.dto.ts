import { PartialType } from '@nestjs/swagger';
import { CreateCinemaDto } from './create-cinema.dto';
import { Optional } from '@nestjs/common';

export class UpdateCinemaDto extends PartialType(CreateCinemaDto) {
  @Optional()
  ten_rap?: string | undefined;

  @Optional()
  ma_cum_rap?: number | undefined;
}
