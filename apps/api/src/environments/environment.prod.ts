import { resolve } from 'path';

export const environment = {
  production: true,
  uiPath: resolve(__dirname, '..', '..', '..', '..', 'dist', 'apps', 'ui'),
};
