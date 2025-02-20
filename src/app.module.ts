import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { TiketModule } from './modules/tiket/tiket.module';
import { MovieModule } from './modules/movie/movie.module';
import { CinemaModule } from './modules/cinema/cinema.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeatModule } from './modules/seat/seat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    TiketModule,
    MovieModule,
    CinemaModule,
    AuthModule,
    SeatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
