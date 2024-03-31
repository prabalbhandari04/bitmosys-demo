import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/user.entity';
import { UserService } from './service/user.service';
import { UserController } from './controllers/user.controller';
import { Pns } from '../database/pns.entity';
import { PnsService } from './service/pns.service';
import { PnsController } from './controllers/pns.controller';
import { Booking } from '../database/booking.entity';
import { BookingService } from './service/booking.service';
import { BookingController } from './controllers/booking.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'bitmosys_db',
      entities: [User, Pns, Booking], 
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Pns, Booking]), 
  ],
  controllers: [
    AppController,
    UserController,
    PnsController,
    BookingController
  ],
  providers: [
    AppService,
    UserService,
    PnsService,
    BookingService,
  ],
})
export class AppModule {}
