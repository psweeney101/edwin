import { config } from 'dotenv';

const { parsed } = config();

if (!parsed) {
  throw new Error('Failed to load environment variables');
}

export const environment = {
  PRODUCTION: parsed['NODE_ENV'] === 'production',
  UI_PATH: parsed['UI_PATH'],
  PHOTOS_PATH: parsed['PHOTOS_PATH'],
  WIFI_SSID: parsed['WIFI_SSID'],
  WIFI_PASSWORD: parsed['WIFI_PASSWORD'],
  WIFI_SECURITY: parsed['WIFI_SECURITY'],
  SPOTIFY_CLIENT_ID: parsed['SPOTIFY_CLIENT_ID'],
  SPOTIFY_CLIENT_SECRET: parsed['SPOTIFY_CLIENT_SECRET'],
  SPOTIFY_REFRESH_TOKEN: parsed['SPOTIFY_REFRESH_TOKEN'],
};
