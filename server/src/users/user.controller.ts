import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() user: UserDto) {
    await this.userService.create(user);

    return { success: true };
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() user: UserDto) {
    console.log(user);
    return await this.userService.login(user);
  }
}
