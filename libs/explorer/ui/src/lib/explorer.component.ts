import { Component } from '@angular/core';

type Plugin = {
  name: string;
  route: string;
  emoji: string;
};

@Component({
  selector: 'edwin-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css'],
})
export class ExplorerComponent {
  plugins: Plugin[] = [
    { name: 'Jukebox', route: '/jukebox', emoji: '🎶' },
    { name: 'Photos', route: '/photos', emoji: '🖼' },
    { name: 'Time', route: '/time', emoji: '🕓' },
    { name: 'WiFi', route: '/wifi', emoji: '📡' },
  ];
}
