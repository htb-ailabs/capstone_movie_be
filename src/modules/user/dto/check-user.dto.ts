import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CheckUserDto {
  @IsString()
  @ApiProperty()
  mat_khau: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;
}
