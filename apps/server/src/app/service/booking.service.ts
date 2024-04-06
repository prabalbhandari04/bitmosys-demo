import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pns } from 'libs/database/pns.entity';
import { User } from 'libs/database/user.entity';
import { NotFoundException } from '@nestjs/common'; 
import { FindOneOptions } from 'typeorm';
import { Booking } from 'libs/database/booking.entity';
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Pns)
    private readonly pnsRepository: Repository<Pns>, 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(
    userId: number,
    pnsId: number,
    startDatetime: Date,
    endDatetime: Date,
  ): Promise<Booking> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const pns = await this.pnsRepository.findOne({ where: { id: pnsId } });
    if (!pns) {
      throw new NotFoundException('Pns not found');
    }

    const booking = new Booking();
    booking.User = user;
    booking.PNS = pns;
    booking.StartDatetime = startDatetime;
    booking.EndDatetime = endDatetime;
    
    return this.bookingRepository.save(booking);
  }

  async getAllBooking(): Promise<Booking[]> {
    return this.bookingRepository.createQueryBuilder('booking')
    .leftJoinAndSelect('booking.User', 'user')
      .leftJoinAndSelect('booking.PNS', 'pns')
      .where('booking.status = :status', { status: 0 })
      .getMany();
  }

  
}
