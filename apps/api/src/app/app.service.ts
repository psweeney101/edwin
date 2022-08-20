import { Message } from '@edwin/api-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  message = 'Welcome to Edwin!';

  getData(): Message {
    return { message: this.message };
  }
}
