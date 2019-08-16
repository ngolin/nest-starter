import { Injectable } from '@nestjs/common';

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
  userName: string;
  avatar: string;
}

@Injectable()
export class UserService {
  private readonly sessionUsers: SessionUser[] = [
    {
      username: 'john',
      userflag: 0b11110000,
      password: 'pword',
    },
  ];
  private readonly displayUsers: DisplayUser[] = [
    {
      username: 'john',
      userflag: 0b11110000,
      userName: 'Mr John',
      avatar: 'https://avatar',
    },
  ];

  async findSessionData(username: string): Promise<SessionUser | undefined> {
    return this.sessionUsers.find(user => user.username === username);
  }

  async findDisplayData(username: string): Promise<DisplayUser> {
    return this.displayUsers.find(user => user.username === username);
  }

  helloWorld() {
    return 'Hello World!';
  }
}
