import { PartialType } from '@nestjs/swagger';
import { CreateSeatDto } from './create-seat.dto';
import { Optional } from '@nestjs/common';

export class UpdateSeatDto extends PartialType(CreateSeatDto) {
  @Optional()
  ten_ghe: string;

  @Optional()
  loai_ghe: string;

  @Optional()
  ma_rap: number;
}
