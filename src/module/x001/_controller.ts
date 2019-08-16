import { Controller, Get } from '@nestjs/common';
import { TestService } from './_service';
import { UserGuard, User, SessionUser } from '../../global/decorator/UserGuard';
import { UserService } from '../x000/_service/user';

@Controller('x001')
export class TestController {
  constructor(
    private readonly userService: UserService,
    private readonly testService: TestService
  ) {}

  // http -v :8080/api/x001 Authorization:$Auth
  @UserGuard()
  @Get()
  async helloWorld(@User('username') username: SessionUser['username']) {
    const { userName } = await this.userService.findDisplayData(username);
    return this.testService.helloWorld(userName);
  }
}
