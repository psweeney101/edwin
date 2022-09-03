import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { environment } from '@edwin/environments/api';
import { PhotosModule } from '@edwin/photos/api';
import { WifiModule } from '@edwin/wifi/api';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: environment.UI_PATH, serveRoot: '/' }),

    PhotosModule,
    WifiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
