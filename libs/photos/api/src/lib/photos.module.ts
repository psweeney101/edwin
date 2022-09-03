import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { environment } from '@edwin/environments/api';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: environment.PHOTOS_PATH, serveRoot: '/api/photos' }),
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports: [PhotosService],
})
export class PhotosModule {}
