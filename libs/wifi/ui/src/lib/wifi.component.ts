import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit, Component, ElementRef, ViewChild,
} from '@angular/core';
import QR from 'qr-code-styling';
import { lastValueFrom } from 'rxjs';
import { Wifi } from '@edwin/wifi/shared';

@Component({
  selector: 'edwin-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.css'],
})
export class WifiComponent implements AfterViewInit {
  /** Wrapper for the QR code */
  @ViewChild('wrapper') wrapper?: ElementRef<HTMLDivElement>;

  constructor(private http: HttpClient) { }

  async ngAfterViewInit(): Promise<void> {
    // Get the WiFi info
    const request = this.http.get<Wifi>('/api/wifi');
    const { ssid, password, security } = await lastValueFrom(request);

    // Build the QR Code
    const qr = new QR({
      data: `WIFI:S:${ssid};T:${security};P:${password};;`,
      width: 1000,
      height: 1000,
      dotsOptions: {
        type: 'rounded',
        color: 'white',
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
      },
      backgroundOptions: {
        color: 'black',
      },
    });
    qr.append(this.wrapper?.nativeElement);
    window.onresize = () => this.resize();
    this.resize();
  }

  /** Resizes the QR code */
  resize(): void {
    // Get the width and height of the wrapper
    const wrapper = this.wrapper?.nativeElement;
    if (!wrapper) return;
    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;

    // Use the smaller of the width and height
    const size = Math.min(width, height);

    // Set the QR code's size
    const qr = wrapper.getElementsByTagName('canvas').item(0) as HTMLCanvasElement;
    if (!qr) return;
    qr.style.width = `${size}px`;
    qr.style.height = `${size}.px`;
  }
}
