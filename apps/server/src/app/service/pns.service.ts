import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pns } from 'libs/database/pns.entity';
import { User } from 'libs/database/user.entity';
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
    userId: number,
  ): Promise<Pns> {
    // Check if service code already exists
    const existingPns = await this.pnsRepository.findOne({ where: { serviceCode } });
    if (existingPns) {
      throw new Error('Service with this code already exists');
    }
  
    // Validate user existence
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Create new Pns entry
    const pns = new Pns();
    pns.serviceCode = serviceCode;
    pns.serviceName = serviceName;
    pns.user = user;
  
    return this.pnsRepository.save(pns);
  }

  

  async getAllPns(): Promise<Pns[]> {
    return this.pnsRepository.createQueryBuilder('pns')
      .leftJoinAndSelect('pns.user', 'user')
      .where('pns.status = :status', { status: 0 })
      .getMany();
  }

  async deletePnsById(id: number): Promise<string> {
    const pns = await this.pnsRepository.findOne({ where: { id } });

    if (!pns) {
      throw new NotFoundException('Pns entry not found');
    }

    await this.pnsRepository.remove(pns);

    // Set status to 1 after deletion
    pns.status = 1;
    await this.pnsRepository.save(pns);

    return 'Pns deleted';
  }

}
