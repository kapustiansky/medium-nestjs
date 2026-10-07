import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto.js';
import { UserEntity } from './user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { IUserResponse } from './types/userResponce.interface.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return this.userRepository.save(newUser);
  }

generateJwt(user: UserEntity): string {
    return this.jwtService.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    });
}

  buildUserResponse(user: UserEntity): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
