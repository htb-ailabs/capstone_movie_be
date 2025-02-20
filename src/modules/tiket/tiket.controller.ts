import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TiketService } from './tiket.service';
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';

@Controller('tiket')
export class TiketController {
  constructor(private readonly tiketService: TiketService) {}

  @Post()
  async create(@Body() createTiketDto: CreateTiketDto) {
    return await this.tiketService.create(createTiketDto);
  }

  @Get()
  async findAll() {
    return await this.tiketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tiketService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTiketDto: UpdateTiketDto,
  ) {
    return await this.tiketService.update(+id, updateTiketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tiketService.remove(+id);
  }
}
