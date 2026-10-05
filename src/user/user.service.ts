import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto.js';

@Injectable()
export class UserService {
    async createUser(createUserDto: CreateUserDto): Promise<any> {
        return createUserDto;
    }
}
