import { Body, Controller, Post } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginInput: LoginInput, //
  ) {
    return this.authService.login({ loginInput });
  }

  // @Post('refresh-token')
  // restoreRefreshToken(@Param('userId') userId: string): Promise<string> {
  //   return this.authService.restoreRefreshToken(userId);
  // }
}
