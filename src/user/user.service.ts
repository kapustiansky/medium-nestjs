import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto.js';
import { UserEntity } from './user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { IUserResponse } from './types/userResponse.interface.js';
import { LoginUserDto } from './dto/loginUserDto.js';
import { PasswordHasher } from '@nestjs/authentication';
import { UpdateUserDto } from './dto/updateUser.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userByEmail) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (userByUsername) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto, {
      password: await this.passwordHasher.hash(createUserDto.password),
    });
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
    const { password, ...safeUser } = user;

    return {
      user: {
        ...safeUser,
        token: this.generateJwt(user),
      },
    };
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: loginUserDto.email })
      .getOne();
    if (!userByEmail) {
      throw new HttpException(
        'User with this credentials not found',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const valid = await this.passwordHasher.verify(
      loginUserDto.password,
      userByEmail.password,
    );
    if (!valid) {
      throw new HttpException(
        'User with this credentials not found',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // или throw new UnauthorizedException('Неверный email или пароль');

    return userByEmail;
  }

  getUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const userByEmail = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (userByEmail) {
        throw new HttpException(
          'Email is already taken',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const userByUsername = await this.userRepository.findOne({
        where: { username: updateUserDto.username },
      });
      if (userByUsername) {
        throw new HttpException(
          'Username is already taken',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (updateUserDto.password) {
      Object.assign(updateUserDto, {
        password: await this.passwordHasher.hash(updateUserDto.password),
      });
    }

    Object.assign(user, updateUserDto, { id });
    return await this.userRepository.save(user);
  }
}
