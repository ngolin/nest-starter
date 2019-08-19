import {
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './_service/auth';
import { UserService } from './_service/user';
import { UserU2S, UserS2S } from '../../shared/user';
import { UserGuard, User } from '../../global/decorator/UserGuard';

@Controller('x000')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  async login({ password, username }: UserU2S) {
    const sessionUser = await this.authService.validateUser(username, password);
    const displayUser = await this.userService.findUserS2U(username);
    return {
      session: this.authService.sign(sessionUser),
      display: displayUser,
    };
  }

  // http -v :8080/api/x000/login username=john password=pword
  @UseGuards(AuthGuard('local'))
  @Post('login')
  pwordLogin(@User() user: UserU2S) {
    return this.login(user);
  }

  // http -v :8080/api/x000/login Authorization:$Auth
  @UserGuard()
  @Get('login')
  async tokenLogin(@User() user: UserS2S) {
    try {
      return await this.login(user);
    } catch {
      throw new HttpException('Password Changed', HttpStatus.UNAUTHORIZED);
    }
  }

  // http -v :8080/api/x000/session Authorization:$Auth
  @UserGuard()
  @Get('session')
  getSession(@User() user: UserS2S) {
    return user;
  }

  // http -v :8080/api/x000/userflag Authorization:$Auth
  @UserGuard(0b10000001)
  @Get('userflag')
  getUserflag(@User('userflag') userflag: UserS2S['userflag']) {
    return userflag;
  }

  // http -v :8080/api/x000
  @Get()
  helloWorld() {
    return this.userService.helloWorld();
  }
}
