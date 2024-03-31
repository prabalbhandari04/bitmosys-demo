import { Controller, Get, Post, Body ,Delete, Param } from '@nestjs/common';
import { BookingService } from '../service/booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(
    @Body() { userId , pnsId , startDatetime, endDatetime }: 
    {  userId: number,
        pnsId: number,
        startDatetime: Date,
        endDatetime: Date, }
  ) {
    return this.bookingService.createBooking(userId , pnsId , startDatetime, endDatetime );
  }

  @Get()
  getAllBooking() {
    return this.bookingService.getAllBooking();
  }


}
