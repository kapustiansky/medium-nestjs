import { IExpressRequest } from '@app/types/expressRequest.interface.js';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IExpressRequest>();

    if (!request.user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
