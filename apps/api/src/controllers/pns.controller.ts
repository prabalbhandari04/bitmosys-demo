import { Controller, Get, Post, Body ,Delete, Param } from '@nestjs/common';
import { PnsService } from '../service/pns.service';

@Controller('pns')
export class PnsController {
  constructor(private readonly pnsService: PnsService) {}

  @Post()
  async createPns(
    @Body() { serviceCode, serviceName, type, hourlyRate, vat, userId }: 
    { serviceCode: number; serviceName: string; type: string; hourlyRate: number; vat: number; userId: number; }
  ) {
    return this.pnsService.createPns(serviceCode, serviceName, type, hourlyRate, vat, userId);
  }

  @Get()
  getAllPns() {
    return this.pnsService.getAllPns();
  }


}
