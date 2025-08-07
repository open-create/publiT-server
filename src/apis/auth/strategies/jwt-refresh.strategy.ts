import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        console.log(req);
        const cookie = req.headers.cookie;
        if (!cookie) return null;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: '_refreshSecrete',
    });
  }

  validate(payload: { sub: string }) {
    console.log('JwtRefreshStrategy validate payload: ', payload);
    return {
      id: payload.sub,
    };
  }
}
