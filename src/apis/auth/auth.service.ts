import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IAuthServiceLogin } from './interfaces/auth.interfaces';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  async login({ loginInput }: IAuthServiceLogin) {
    const user = await this.usersService.findOneByUsername({
      username: loginInput.username,
    });
    const isAuth = await bcrypt.compare(loginInput.password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('password is wrong');

    this.setRefreshToken();
    return this.getAccessToken();
  }

  getAccessToken() {}

  setRefreshToken() {}

  restoreRefreshToken() {}
}
