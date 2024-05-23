import { readdir } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { environment } from '@edwin/environments/api';
import { Photo } from '@edwin/photos/shared';

@Injectable()
export class PhotosService {
  path = environment.PHOTOS_PATH;

  async list(): Promise<Photo[]> {
    const photos = await readdir(this.path);
    return photos.filter(p => !p.startsWith('.'));
  }
}
