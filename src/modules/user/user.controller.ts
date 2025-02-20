import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckUserDto } from './dto/check-user.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('search')
  searchAll(@Body('ho_ten') ho_ten: string) {
    return this.userService.searchAll(ho_ten);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  @Post('login')
  login(@Body() checkUserDto: CheckUserDto) {
    return this.userService.login(checkUserDto);
  }

  @Post('logout/:id')
  logout(@Param('id') id: string) {
    return this.userService.logout(+id);
  }
}
