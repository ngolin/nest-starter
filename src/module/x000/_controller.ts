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
import { UserService, SignedUser } from './_service/user';
import { UserGuard, User, SessionUser } from '../../global/decorator/UserGuard';

@Controller('x000')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  async login({ password, username }: SignedUser) {
    const sessionUser = await this.authService.validateUser(username, password);
    const displayUser = await this.userService.findDisplayData(username);
    return {
      session: this.authService.sign(sessionUser),
      display: displayUser,
    };
  }

  // http -v :8080/api/x000/login username=john password=pword
  @UseGuards(AuthGuard('local'))
  @Post('login')
  pwordLogin(@User() user: SignedUser) {
    return this.login(user);
  }

  // http -v :8080/api/x000/login Authorization:$Auth
  @UserGuard()
  @Get('login')
  async tokenLogin(@User() user: SessionUser) {
    try {
      return await this.login(user);
    } catch {
      throw new HttpException('Password Changed', HttpStatus.UNAUTHORIZED);
    }
  }

  // http -v :8080/api/x000/session Authorization:$Auth
  @UserGuard()
  @Get('session')
  getSession(@User() user: SessionUser) {
    return user;
  }

  // http -v :8080/api/x000/userflag Authorization:$Auth
  @UserGuard(0b10000001)
  @Get('userflag')
  getUserflag(@User('userflag') userflag: SessionUser['userflag']) {
    return userflag;
  }

  // http -v :8080/api/x000
  @Get()
  helloWorld() {
    return this.userService.helloWorld();
  }
}
