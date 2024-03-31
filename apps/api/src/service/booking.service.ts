import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions} from 'typeorm';
import { Booking } from '../../database/booking.entity';
import { Pns } from '../../database/pns.entity';
import { User } from '../../database/user.entity';

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
    return this.bookingRepository.find();
  }

  async deleteBookingById(id: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({ where: { id } } as FindOneOptions<Booking>);
  
    if (!booking) {
      throw new NotFoundException('PNS entry not found');
    }
    await this.bookingRepository.remove(booking);
  }
  
  
}
