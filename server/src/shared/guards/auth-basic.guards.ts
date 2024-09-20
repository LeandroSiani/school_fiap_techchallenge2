import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization Header');
    }

    const [type, credentials] = authHeader.split(' ');

    if (type !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Invalid Authorization Header');
    }

    const decodedCredentials = Buffer.from(credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = decodedCredentials.split(':');

    if (username !== 'admin' || password !== 'supersecret') {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return true;
  }
}
