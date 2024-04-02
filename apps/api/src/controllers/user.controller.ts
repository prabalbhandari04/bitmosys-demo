import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() { name, role }: { name: string; role: string }) {
    return this.userService.createUser(name, role); 
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUser();
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
