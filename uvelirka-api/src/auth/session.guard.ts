import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ApiSession } from '../models/api-request.model';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    const session = request.session as unknown as ApiSession;

    console.log(session);

    return !!session.persistentUser;
  }
}