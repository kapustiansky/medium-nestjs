import { UserEntity } from '@app/user/user.entity.js';
import type { Request } from 'express';

export interface IExpressRequest extends Request {
  user?: UserEntity | null;
}
