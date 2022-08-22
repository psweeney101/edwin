export const environment = {
  production: process.env['NODE_ENV'] === 'production',
  uiPath: process.env['UI_PATH'] as string,
  photosPath: process.env['PHOTOS_PATH'] as string,
};
