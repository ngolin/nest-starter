import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy, jwtSecretKey } from './_strategy/jwt';
import { LocalStrategy } from './_strategy/local';
import { AuthService } from './_service/auth';
import { UserService } from './_service/user';
import { UserController } from './_controller';
import { User } from './_entities/user';
@Module({
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtSecretKey,
    }),
    PassportModule,
  ],
})
export class X000Module {}
