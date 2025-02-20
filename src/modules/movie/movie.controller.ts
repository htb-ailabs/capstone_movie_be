import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { phim } from '@prisma/client';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<any> {
    return await this.movieService.create(createMovieDto);
  }

  @Get('search')
  async searchItems(@Query('ten_phim') ten_phim: string) {
    return await this.movieService.searchItems(ten_phim);
  }

  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @Get('list')
  async getlist(
    @Query()
    query: any,
    @Query(`page`)
    page: string,
  ) {
    return await this.movieService.findAllPages(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.movieService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.movieService.remove(+id);
  }
}
