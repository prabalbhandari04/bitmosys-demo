import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'libs/database/user.entity';

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
    return this.userRepository.find({ where: { status: 0 } });
  }
  

  async deleteUserById(id: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User entry not found');
    }

    await this.userRepository.remove(user);

    // Set status to 1 after deletion
    user.status = 1;
    await this.userRepository.save(user);

    return 'User deleted';
  }
}
