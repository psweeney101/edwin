import { Injectable } from '@nestjs/common';
import { environment } from '@edwin/environments/api';
import { Wifi } from '@edwin/wifi/shared';

@Injectable()
export class WifiService {
  read(): Wifi {
    return {
      ssid: environment.WIFI_SSID,
      password: environment.WIFI_PASSWORD,
      security: environment.WIFI_SECURITY,
    };
  }
}
