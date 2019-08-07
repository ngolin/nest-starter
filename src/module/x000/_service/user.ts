import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'chris',
      password: 'secret',
    },
    {
      userId: 3,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findone(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  helloWorld() {
    return 'Hello World!';
  }
}
