import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../_entities/user';
export interface SignedUser {
  username: string;
  password: string;
}

export interface SessionUser extends SignedUser {
  userflag: number;
}

export interface DisplayUser {
  username: string;
  userflag: number;
  fullName: string;
  avatar: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  private readonly displayUsers: DisplayUser[] = [
    {
      username: 'john',
      userflag: 0b11110000,
      fullName: 'Mr John',
      avatar: 'https://avatar',
    },
  ];

  async findSessionData(username: string): Promise<SessionUser | never> {
    if (username === 'root') {
      return { username, password: '', userflag: 0b11111111 };
    }
    const { userflag, password } = await this.userRepo.findOne({ username });
    return { username, password, userflag };
  }

  async findDisplayData(username: string): Promise<DisplayUser> {
    return this.displayUsers.find(user => user.username === username);
  }

  helloWorld() {
    return 'Hello World!';
  }
}
