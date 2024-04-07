import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pns } from 'libs/database/pns.entity';
import { Rate } from 'libs/database/rate.entity';
import { User } from 'libs/database/user.entity';
import { NotFoundException } from '@nestjs/common'; 
import { FindOneOptions } from 'typeorm';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Pns)
    private readonly pnsRepository: Repository<Pns>, 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
  ) {}

  async createRate(
    pnsId: number,
    name : string,
    hourlyRate: number,
    vat: number,
  ): Promise<Rate> {
    const pns = await this.pnsRepository.findOne({ where: { id : pnsId } });
    if (!pns) {
      throw new NotFoundException('Pns not found');
    }
  
    const rate = new Rate();
    rate.name = name;
    rate.hourlyRate = hourlyRate;
    rate.vat = vat;
    rate.pns = pns;
    
    return this.rateRepository.save(rate);
  }

  async getAllRate(): Promise<Rate[]> {
    return this.rateRepository.createQueryBuilder('rate')
      .leftJoinAndSelect('rate.pns', 'pns')
      .where('rate.status = :status', { status: 0 })
      .getMany();
  }

  async deleteRateById(id: number): Promise<string> {
    const rate = await this.rateRepository.findOne({ where: { id } });

    if (!rate) {
      throw new NotFoundException('Pns entry not found');
    }

    await this.rateRepository.remove(rate);

    // Set status to 1 after deletion
    rate.status = 1;
    await this.rateRepository.save(rate);

    return 'Rate deleted';
  }

}
