import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiketService } from './tiket.service';
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';

@Controller('tiket')
export class TiketController {
  constructor(private readonly tiketService: TiketService) {}

  @Post()
  create(@Body() createTiketDto: CreateTiketDto) {
    return this.tiketService.create(createTiketDto);
  }

  @Get()
  findAll() {
    return this.tiketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiketDto: UpdateTiketDto) {
    return this.tiketService.update(+id, updateTiketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiketService.remove(+id);
  }
}
