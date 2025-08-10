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
  loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin({ req, res });
  }

  @UseGuards(AuthGuard('naver'))
  @Get('login-naver')
  loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin({ req, res });
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
