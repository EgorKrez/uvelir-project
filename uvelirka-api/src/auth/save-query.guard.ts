import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { stringIsAValidUrl } from '../utils/url.utils';


@Injectable()
export class SaveQueryGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    const session = request.session as unknown as Record<string, string>;
    const query = request.query as Record<string, string>;

    if (!stringIsAValidUrl(query.from, ['http', 'https'])) {
      throw new BadRequestException('from query parameter is invalid. It should be a valid url');
    }

    session.from = query.from;

    return true;
  }
}