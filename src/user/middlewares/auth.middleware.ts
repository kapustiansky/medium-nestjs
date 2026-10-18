import { Injectable } from '@nestjs/common';
import type { NextFunction, Response } from 'express';
import { IExpressRequest } from '@app/types/expressRequest.interface.js';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service.js';
import { UserEntity } from '../user.entity.js';

@Injectable()
export class AuthMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    let user: {
      id: UserEntity['id'];
      email: UserEntity['email'];
      username: UserEntity['username'];
    };
    try {
      user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (err) {
      req.user = null;
      next();
      return;
    }

    try {
      req.user = await this.userService.getUserById(user.id);
    } catch (err) {
      req.user = null;
      next(err);
      return;
    }

    next();
  }
}
