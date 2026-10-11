import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/createUser.dto.js';
import { IUserResponse } from './types/userResponce.interface.js';
import { LoginUserDto } from './dto/loginUserDto.js';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }
}
