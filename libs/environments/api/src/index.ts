import { config } from 'dotenv';

const { parsed } = config();

if (!parsed) {
  throw new Error('Failed to load environment variables');
}

export const environment = {
  production: parsed['NODE_ENV'] === 'production',
  uiPath: parsed['UI_PATH'],
  photosPath: parsed['PHOTOS_PATH'],
};
