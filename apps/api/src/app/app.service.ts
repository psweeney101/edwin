import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  message = 'Welcome to Edwin!';

  getData(): string {
    return this.message;
  }
}
