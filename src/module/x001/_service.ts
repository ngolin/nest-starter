import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  helloWorld(name: string) {
    return `Hello, ${name}!`;
  }
}
