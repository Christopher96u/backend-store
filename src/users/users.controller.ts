import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return {
      message: 'This action returns all users',
    };
  }
  @Post()
  createUser() {
    return {
      message: 'This action returns a new user created',
    };
  }
}
