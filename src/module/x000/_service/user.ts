import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../_entities/user';
import { UserS2S, UserS2C } from '../../../shared/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  private readonly displayUsers: UserS2C[] = [
    {
      username: 'john',
      userflag: 0b11110000,
      fullName: 'Mr John',
      avatar: 'https://avatar',
    },
  ];

  async findUserS2SorThrow(username: string): Promise<UserS2S | never> {
    const { userflag, password } = await this.userRepo.findOne({ username });
    return { username, password, userflag };
  }

  async findUserS2U(username: string): Promise<UserS2C | undefined> {
    return this.displayUsers.find(user => user.username === username);
  }

  helloWorld() {
    return 'Hello World!';
  }
}
