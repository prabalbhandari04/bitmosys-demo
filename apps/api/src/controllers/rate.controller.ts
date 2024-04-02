import { Controller, Get, Post, Body ,Delete, Param } from '@nestjs/common';
import { RateService } from '../service/rate.service';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  async createRate(
    @Body() { pnsId, hourlyRate, vat }: 
    { pnsId: number; hourlyRate: number; vat: number }
  ) {
    return this.rateService.createRate(pnsId, hourlyRate, vat);
  }

  @Get()
  getAllRate() {
    return this.rateService.getAllRate();
  }

  @Delete(':id')
  deleteRateById(@Param('id') id: number) {
    return this.rateService.deleteRateById(id);
  }

}
