import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() user: { username: string; email: string; password: string }) {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: { username?: string; email?: string; password?: string },
  ) {
    return this.usersService.update(id, userUpdate);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
