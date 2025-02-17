import { PartialType } from '@nestjs/swagger';
import { CreateTiketDto } from './create-tiket.dto';

export class UpdateTiketDto extends PartialType(CreateTiketDto) {}
