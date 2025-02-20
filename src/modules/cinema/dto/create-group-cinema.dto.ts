import { IsString } from 'class-validator';

export class CreateGroupCinemaDto {
  @IsString()
  ten_cum_rap: string;

  @IsString()
  dia_chi: string;
}
