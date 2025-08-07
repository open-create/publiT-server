import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '_accessSecrete',
    });
  }

  validate(payload: { sub: string }) {
    console.log('JwtAccessStrategy: ', payload);
    return {
      id: payload.sub,
    };
  }
}
