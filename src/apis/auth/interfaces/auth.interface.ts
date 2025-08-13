import { Request, Response } from 'express';
import { LoginInput } from '../dto/login.input';
import { User } from 'src/apis/users/entities/user.entity';
import { IOAuthUser } from 'src/commons/interfaces/context';

export interface IAuthServiceLogin {
  loginInput: LoginInput;
  res: Response;
}

export interface IAuthServiceGetAccessToken {
  user?: { id: string };
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}

export interface IAuthServiceRestoreAccessToken {
  user?: { id: string };
}

export interface IAuthServiceSocialLogin {
  req: Request & IOAuthUser;
  res: Response;
}
