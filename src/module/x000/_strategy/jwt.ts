import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

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

  async validate(payload) {
    return payload;
  }
}
