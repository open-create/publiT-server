import { Request } from 'express';

export interface IAuthUser {
  user?: {
    id: string; //
  };
}

export interface IRequest {
  req: Request & IAuthUser;
}
