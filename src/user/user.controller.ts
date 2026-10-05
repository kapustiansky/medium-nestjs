import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/createUser.dto.js';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<any> {
        return await this.userService.createUser(createUserDto);
    }
}
