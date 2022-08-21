import { resolve } from 'path';

export const environment = {
  production: false,
  uiPath: resolve(__dirname, '..', '..', '..', 'dist', 'apps', 'ui'),
};
