import { config } from 'dotenv';

if (process.env['NODE_ENV'] !== 'production') {
  if (!config()) {
    throw new Error('Failed to load environment variables');
  }
}

export const environment = {
  PRODUCTION: process.env['NODE_ENV'] === 'production',
  API_URL: process.env['API_URL'] as string,
  UI_URL: process.env['UI_URL'] as string,
  UI_DIST_PATH: process.env['UI_DIST_PATH'] as string,

  SPOTIFY_CLIENT_ID: process.env['SPOTIFY_CLIENT_ID'] as string,
  SPOTIFY_CLIENT_SECRET: process.env['SPOTIFY_CLIENT_SECRET'] as string,
  SPOTIFY_REFRESH_TOKEN: process.env['SPOTIFY_REFRESH_TOKEN'] as string,

  PHOTOS_PATH: process.env['PHOTOS_PATH'] as string,

  WIFI_SSID: process.env['WIFI_SSID'] as string,
  WIFI_PASSWORD: process.env['WIFI_PASSWORD'] as string,
  WIFI_SECURITY: process.env['WIFI_SECURITY'] as string,
};
