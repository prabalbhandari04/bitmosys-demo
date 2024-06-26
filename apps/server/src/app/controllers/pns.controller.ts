import { Controller, Get, Post, Body ,Delete, Param } from '@nestjs/common';
import { PnsService } from '../service/pns.service';

@Controller('pns')
export class PnsController {
  constructor(private readonly pnsService: PnsService) {}

  @Post()
  async createPns(
    @Body() { serviceCode, serviceName,  userId }: 
    { serviceCode: number; serviceName: string; userId: number; }
  ) {
    return this.pnsService.createPns(serviceCode, serviceName,userId);
  }

  @Get()
  getAllPns() {
    return this.pnsService.getAllPns();
  }

  @Delete(':id')
  deletePnsById(@Param('id') id: number) {
    return this.pnsService.deletePnsById(id);
  }

}
