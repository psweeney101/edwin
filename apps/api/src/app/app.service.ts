import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  pong = 'pong';

  ping(): string {
    return this.pong;
  }
}
