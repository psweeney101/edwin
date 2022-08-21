import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '../environments/environment';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(environment.uiPath) }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
