import { Injectable } from '@nestjs/common';
import { Message } from '@edwin/api-interfaces';

@Injectable()
export class AppService {
  message = 'Welcome to Edwin!';

  getData(): Message {
    return { message: this.message };
  }
}
