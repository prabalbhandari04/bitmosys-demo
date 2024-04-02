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
import { Rate } from '../database/rate.entity'; // Corrected path
import { RateController } from './controllers/rate.controller';
import { RateService } from './service/rate.service';

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
      entities: [User, Pns, Booking, Rate], // Included Rate entity
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Pns, Booking, Rate]) // Included Rate entity
  ],
  controllers: [
    AppController,
    UserController,
    PnsController,
    BookingController,
    RateController // Included RateController
  ],
  providers: [
    AppService,
    UserService,
    PnsService,
    BookingService,
    RateService // Included RateService
  ],
})
export class AppModule {}
