import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth.interfaces';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, //
    private readonly jwtService: JwtService,
  ) {}

  async login({ loginInput, res }: IAuthServiceLogin) {
    const user = await this.usersService.findOneByUsername({
      username: loginInput.username,
    });
    const isAuth = await bcrypt.compare(loginInput.password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('password is wrong');

    this.setRefreshToken({ user, res });
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken) {
    if (!user) {
      throw new UnprocessableEntityException('User is undefined.');
    }
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '_accessSecrete', expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: '_refreshSecrete', expiresIn: '2w' },
    );

    // <CAUTION> this is for development environment
    res.setHeader(
      'set-Cookie', //
      `refreshToken=${refreshToken}; path=/`,
    );

    // <IMPORTANT> production environment
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`,
    // );
    // context.res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   'https://myfrontendsite.com',
    // );
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }
}
