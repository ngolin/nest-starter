import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user';
import { UserS2S } from '../../../shared/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<UserS2S> {
    try {
      const user = await this.usersService.findUserS2SorThrow(username);
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

  sign(payload: UserS2S): string {
    return this.jwtService.sign(payload);
  }
}
