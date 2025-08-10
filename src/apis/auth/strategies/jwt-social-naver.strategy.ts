import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    const clientID = process.env.NAVER_SOCIAL_CLIENT_ID;
    const clientSecret = process.env.NAVER_SOCIAL_CLIENT_SECRET;
    const serverURL = process.env.SERVER_URL;

    if (!clientID || !clientSecret || !serverURL) {
      throw new Error('Missing Naver OAuth environment variables');
    }

    super({
      clientID,
      clientSecret,
      callbackURL: `${serverURL}/auth/login-naver`,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: import('passport-naver').Profile,
  ) {
    return {
      userName: profile.displayName,
      email: profile.emails?.[0]?.value ?? '',
      provider: 'naver',
      accessToken,
    };
  }
}
