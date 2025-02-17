import { Injectable } from '@nestjs/common';
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';

@Injectable()
export class TiketService {
  create(createTiketDto: CreateTiketDto) {
    return 'This action adds a new tiket';
  }

  findAll() {
    return `This action returns all tiket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiket`;
  }

  update(id: number, updateTiketDto: UpdateTiketDto) {
    return `This action updates a #${id} tiket`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiket`;
  }
}
