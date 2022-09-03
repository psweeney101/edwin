import { Controller, Get } from '@nestjs/common';
import { Wifi } from '@edwin/wifi/shared';
import { WifiService } from './wifi.service';

@Controller('wifi')
export class WifiController {
  constructor(private readonly wifiService: WifiService) {}

  @Get()
  read(): Wifi {
    return this.wifiService.read();
  }
}
