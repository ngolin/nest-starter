import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, jwtSecretKey } from './_strategy/jwt';
import { LocalStrategy } from './_strategy/local';
import { AuthService } from './_service/auth';
import { UserService } from './_service/user';
import { UserController } from './_controller';

@Module({
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
  imports: [
    PassportModule,
    JwtModule.register({
      // signOptions: { expiresIn: '7d' },
      secret: jwtSecretKey,
    }),
  ],
})
export class X000Module {}
