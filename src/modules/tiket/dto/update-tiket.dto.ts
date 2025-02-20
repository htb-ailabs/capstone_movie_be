import { PartialType } from '@nestjs/swagger';
import { CreateTiketDto } from './create-tiket.dto';
import { Optional } from '@nestjs/common';

export class UpdateTiketDto extends PartialType(CreateTiketDto) {
  @Optional()
  ma_lich_chieu?: number | undefined;

  @Optional()
  ma_ghe?: number;

  @Optional()
  tai_khoan?: number | undefined;
}
