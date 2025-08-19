import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
  IAuthServiceSocialLogin,
} from './interfaces/auth.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

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
    this.setRefreshToken({ user, res });
    return this.getAccessToken({ user });
  }

  async socialLogin({ req, res }: IAuthServiceSocialLogin) {
    // 1. 회원조회
    let user: User | null = await this.usersService.findOneByEmail({
      email: req.user.email,
    });
    // 2. 가입 안되어있다면 회원가입
    if (!user)
      user = await this.usersService.create({
        createUserInput: {
          ...req.user, //
          username: req.user.username ?? 'user',
        },
      });
    // 3. 회원가입이 되어있다면
    // 로그인 (refreshToken, accessToken 만들어서 브라우저에 전송)
    this.setRefreshToken({ user, res });
    res.redirect(`${process.env.CLIENT_URL}`);
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
    // res.setHeader(
    //   'set-Cookie', //
    //   `refreshToken=${refreshToken}; path=/`,
    // );
    // <IMPORTANT> production environment
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`,
    // );
    // context.res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   'https://myfrontendsite.com',
    // );
    if (process.env.NODE_ENV === 'prod') {
      res.setHeader(
        'set-Cookie',
        `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=None`, // Secure 없음
      );
    } else if (process.env.NODE_ENV === 'dev') {
      res.setHeader(
        'set-Cookie', //
        `refreshToken=${refreshToken}; path=/`,
      );
    }
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }
}
