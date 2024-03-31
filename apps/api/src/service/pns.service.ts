import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pns } from '../../database/pns.entity';
import { User } from '../../database/user.entity';
import { NotFoundException } from '@nestjs/common'; 
import { FindOneOptions } from 'typeorm';

@Injectable()
export class PnsService {
  constructor(
    @InjectRepository(Pns)
    private readonly pnsRepository: Repository<Pns>, 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPns(
    serviceCode: number,
    serviceName: string,
    type: string,
    hourlyRate: number,
    vat: number,
    userId: number,
  ): Promise<Pns> {
    // Validate service code
    const existingPns = await this.pnsRepository.findOne({ where: { serviceCode } });
    if (existingPns) {
      throw new Error('Service code already exists');
    }

    const pns = new Pns();
    pns.serviceCode = serviceCode;
    pns.serviceName = serviceName;
    pns.type = type;
    pns.hourlyRate = hourlyRate;
    pns.vat = vat;
    pns.user = await this.userRepository.findOne({ where: { id: userId } });
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    return this.pnsRepository.save(pns);
  }

  async getAllPns(): Promise<Pns[]> {
    return this.pnsRepository.find();
  }

  async deletePnsById(id: number): Promise<void> {
    const pns = await this.pnsRepository.findOne({ where: { id } });

    if (!pns) {
      throw new NotFoundException('PNS entry not found');
    }
    await this.pnsRepository.remove(pns);
  }

}
