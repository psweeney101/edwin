import { readdir } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { environment } from '@edwin/environments/api';
import { Photos } from '@edwin/photos/shared';

@Injectable()
export class PhotosService {
  path = environment.photosPath;

  async list(): Promise<Photos> {
    const photos = await readdir(this.path);
    return photos.filter(p => !p.startsWith('.'));
  }
}
