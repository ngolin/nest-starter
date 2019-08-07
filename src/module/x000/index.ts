import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './_service/auth';
import { JwtStrategy } from './_strategy/jwt';
import { LocalStrategy } from './_strategy/local';
import { UserService } from './_service/user';

import { UserController } from './_controller';

@Module({
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  controllers: [UserController],
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
      secret: 'secretKey',
    }),
  ],
})
export class X000Module {}
