import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  async create(@Body() createSeatDto: CreateSeatDto) {
    return await this.seatService.create(createSeatDto);
  }

  @Get()
  async findAll() {
    return await this.seatService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.seatService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return await this.seatService.update(+id, updateSeatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.seatService.remove(+id);
  }
}
