import { IExpressRequest } from '@app/types/expressRequest.interface.js';
import type { UserEntity } from '@app/user/user.entity.js';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator<keyof UserEntity>(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IExpressRequest>();

    if (!request.user) {
      return null;
    }

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
