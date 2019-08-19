import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserS2S } from '../../../shared/user';

export const jwtSecretKey = 'secretKey';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: jwtSecretKey,
      ignoreExpiration: true,
    });
  }

  async validate(payload: UserS2S) {
    return payload;
  }
}
