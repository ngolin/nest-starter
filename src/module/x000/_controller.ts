import {
  Controller,
  Get,
  Req,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './_service/auth';
import { UserService, LoginUser, SessionUser } from './_service/user';

interface UserRequest<T> extends Request {
  user: T;
}

export type SessionRequest = UserRequest<SessionUser>;

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  async login({ password, username }: LoginUser) {
    const sessionUser = await this.authService.validateUser(username, password);
    const displayUser = await this.userService.findDisplayData(username);
    return {
      session: this.authService.sign(sessionUser),
      display: displayUser,
    };
  }

  // http -v :8080/api/user/login username=john password=pword
  @UseGuards(AuthGuard('local'))
  @Post('login')
  pwordLogin(@Req() req: UserRequest<LoginUser>) {
    return this.login(req.user);
  }

  // http -v :8080/api/user/login Authorization:$Auth
  @UseGuards(AuthGuard('jwt'))
  @Get('login')
  async tokenLogin(@Req() req: UserRequest<LoginUser>) {
    try {
      return await this.login(req.user);
    } catch {
      throw new HttpException('Password Changed', HttpStatus.UNAUTHORIZED);
    }
  }

  // http -v :8080/api/user/session Authorization:$Auth
  @UseGuards(AuthGuard('jwt'))
  @Get('session')
  getSession(@Req() req: UserRequest<SessionUser>) {
    return req.user;
  }

  // http -v :8080/api/user
  @Get()
  helloWorld() {
    return this.userService.helloWorld();
  }
}
