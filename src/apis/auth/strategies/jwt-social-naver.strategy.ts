import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    const clientID = process.env.NAVER_SOCIAL_CLIENT_ID;
    const clientSecret = process.env.NAVER_SOCIAL_CLIENT_SECRET;
    const serverURL = process.env.SERVER_URL;

    console.log(clientID, clientSecret, serverURL);
    if (!clientID || !clientSecret || !serverURL) {
      throw new Error('Missing Google OAuth environment variables');
    }

    super({
      clientID,
      clientSecret,
      callbackURL: serverURL + '/auth/login-naver',
      // scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: import('passport-google-oauth20').Profile,
  ) {
    return {
      userName: profile.displayName,
      email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
      password: '1234',
    };
  }
}
