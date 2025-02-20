import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { NotFoundExceptionFilter } from 'src/common/helpers/not-found.filter';
import { CreateGroupCinemaDto } from './dto/create-group-cinema.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('cinema')
@UseFilters(new NotFoundExceptionFilter()) // Apply the filter here
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post()
  async create(@Body() createCinemaDto: CreateCinemaDto) {
    return await this.cinemaService.create(createCinemaDto);
  }

  @Post('groupCinema')
  async createGroupCinema(@Body() createGroupCinemaDto: CreateGroupCinemaDto) {
    return await this.cinemaService.createGroupCinema(createGroupCinemaDto);
  }

  @Get()
  async findAll() {
    return await this.cinemaService.findAll();
  }

  @Get('groupcinema')
  async findGroupcinema() {
    return await this.cinemaService.findGroupcinema();
  }

  @Get('schedule')
  async getScheduleAll() {
    return await this.cinemaService.getScheduleAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cinemaService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCinemaDto: UpdateCinemaDto,
  ) {
    return await this.cinemaService.update(+id, updateCinemaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cinemaService.remove(+id);
  }

  @Post('schedule')
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return await this.cinemaService.createSchedule(createScheduleDto);
  }
}
