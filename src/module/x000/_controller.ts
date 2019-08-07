import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './_service/auth';
import { UserService } from './_service/user';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  /*
    curl -X POST http://localhost:8080/api/user/login \
      -d '{"username": "john", "password": "changeme"}' \
      -H "Content-Type: application/json"
  */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /*
    curl http://localhost:8080/api/user/me \
      -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU2NTg4NzEwOCwiZXhwIjoxNTY1ODg3MTY4fQ.FFYL1xqFYng4HYa-VorecLXzf6S-Dp5T7bCdOpMlnuA"
  */
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  // curl http://localhost:8080/api/user
  @Get()
  helloWorld() {
    return this.userService.helloWorld();
  }
}
