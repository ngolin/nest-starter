import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserService, SessionUser } from './user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<SessionUser> {
    try {
      const user = await this.usersService.findSessionData(username);
      if (user.password !== password) {
        throw new HttpException(
          `Password '${password}' Not Acceptable`,
          HttpStatus.NOT_ACCEPTABLE
        );
      }
      return user;
    } catch {
      throw new HttpException(
        `Username '${username}' Not Found`,
        HttpStatus.NOT_FOUND
      );
    }
  }

  sign(payload: SessionUser): string {
    return this.jwtService.sign(payload);
  }
}
