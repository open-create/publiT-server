import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { IRequest } from 'src/commons/interfaces/context';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginInput: LoginInput, //
    @Res() res: Response,
  ) {
    return this.authService.login({ loginInput, res });
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('refresh-token')
  restoreAccessToken(
    @Req() context: IRequest, //
  ): string {
    return this.authService.restoreAccessToken({ user: context.req.user });
  }
}
