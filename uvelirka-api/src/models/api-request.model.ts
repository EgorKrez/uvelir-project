import { Request, Response } from 'express';
import { Session } from 'express-session';
import { User } from '../mongo/user.schema';

export interface IAuthUser {
  readonly email: string;
  readonly name: string;
  readonly avatar: string;
  readonly accessToken: string;
}

export type ApiRequest = Request & {
  user: IAuthUser
};

export type ApiResponse = Response;

export type ApiSession = {
  from: string;
  test: number;
  persistentUser: User;
  user: unknown;
} & Session;