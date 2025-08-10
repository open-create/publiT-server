import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

import { Profile as KakaoProfile } from 'passport-kakao';

interface KakaoAccount {
  profile?: {
    nickname?: string;
  };
  email?: string;
}

interface KakaoProfileWithJson extends KakaoProfile {
  _json: {
    kakao_account?: KakaoAccount;
    [key: string]: any; // 카카오가 반환하는 다른 필드들
  };
}

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    const clientID = process.env.KAKAO_CLIENT_ID;
    const clientSecret = process.env.KAKAO_CLIENT_SECRET;
    const serverURL = process.env.SERVER_URL;

    if (!clientID || !serverURL) {
      throw new Error('Missing Kakao OAuth environment variables');
    }

    super({
      clientID,
      clientSecret,
      callbackURL: `${serverURL}/auth/login-kakao`,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: KakaoProfileWithJson,
  ) {
    const kakaoAccount = profile._json?.kakao_account ?? {};

    return {
      provider: 'kakao',
      kakaoId: profile.id,
      nickname: kakaoAccount.profile?.nickname ?? '',
      email: kakaoAccount.email ?? '',
      accessToken,
    };
  }
}
