import { Controller, Get } from '@nestjs/common';
import { Photos } from '@edwin/photos/shared';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  list(): Promise<Photos> {
    return this.photosService.list();
  }
}
