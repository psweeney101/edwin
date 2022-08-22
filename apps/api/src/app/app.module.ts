import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { environment } from '@edwin/environments/api';
import { PhotosModule } from '@edwin/photos/api';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: environment.uiPath, serveRoot: '/' }),
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
