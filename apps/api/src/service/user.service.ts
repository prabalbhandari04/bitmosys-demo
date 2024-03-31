import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(name: string, role: string): Promise<User> { 
    const user = new User();
    user.name = name;
    user.role = role;
    return this.userRepository.save(user);
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }
}
