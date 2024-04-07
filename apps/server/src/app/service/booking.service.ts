import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rate } from 'libs/database/rate.entity';
import { User } from 'libs/database/user.entity';
import { NotFoundException } from '@nestjs/common'; 
import { FindOneOptions } from 'typeorm';
import { Booking } from 'libs/database/booking.entity';
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>, 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(
    userId: number,
    rateId: number,
    startDatetime: Date,
    endDatetime: Date,
  ): Promise<Booking> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const rate = await this.rateRepository.findOne({ where: { id: rateId } });
    if (!rate) {
      throw new NotFoundException('Pns not found');
    }

    const booking = new Booking();
    booking.User = user;
    booking.Rate = rate;
    booking.StartDatetime = startDatetime;
    booking.EndDatetime = endDatetime;
    
    return this.bookingRepository.save(booking);
  }

  async getAllBooking(): Promise<Booking[]> {
    return this.bookingRepository.createQueryBuilder('booking')
    .leftJoinAndSelect('booking.User', 'user')
      .leftJoinAndSelect('booking.Rate', 'rate')
      .where('booking.status = :status', { status: 0 })
      .getMany();
  }

  
}
