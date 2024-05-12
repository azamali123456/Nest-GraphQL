import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
     console.log('Backend Started at Port 3000')
    return 'Hello World!';
  }
}
