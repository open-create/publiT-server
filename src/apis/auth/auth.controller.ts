import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { IAuthUser, IOAuthUser } from 'src/commons/interfaces/context';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  login(
    @Body() loginInput: LoginInput, //
    @Res() res: Response,
  ) {
    return this.authService.login({ loginInput, res });
  }

  @UseGuards(AuthGuard('google'))
  @Get('login-google')
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 회원조회
    let user: User | null = await this.usersService.findOneByEmail({
      email: req.user.email,
    });

    // 2. 가입 안되어있다면 회원가입
    if (!user)
      user = await this.usersService.create({
        createUserInput: {
          ...req.user, //
          username: req.user.username ?? 'google-user',
        },
      });

    // 3. 회원가입이 되어있다면
    // 로그인 (refreshToken, accessToken 만들어서 브라우저에 전송)
    this.authService.setRefreshToken({ user, res });
    res.redirect(`${process.env.CLIENT_URL}/test-frontend.html`);
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('refresh'))
  restoreAccessToken(
    @Req() req: Request & IAuthUser, //
  ): string {
    if (!req.user) throw new UnprocessableEntityException('error');
    console.log('context.req.user: ', req.user);
    return this.authService.restoreAccessToken({ user: req.user });
  }
}
