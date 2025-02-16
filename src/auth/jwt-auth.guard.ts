import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { env } from '../constants/env';
interface RequestWithUser extends Request {
  user: string | jwt.JwtPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers['authorization'] as string | undefined;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);

      request.user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}
