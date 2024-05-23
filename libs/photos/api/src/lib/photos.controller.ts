import { Controller, Get } from '@nestjs/common';
import { Photo } from '@edwin/photos/shared';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) { }

  @Get()
  list(): Promise<Photo[]> {
    return this.photosService.list();
  }
}
