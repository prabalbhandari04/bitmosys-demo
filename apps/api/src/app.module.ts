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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'bitmosys_db',
      entities: [User, Pns], 
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Pns]), 
  ],
  providers: [
    UserService,
    PnsService, 
  ],
  controllers: [
    UserController,
    PnsController, 
  ],
})
export class AppModule {}
