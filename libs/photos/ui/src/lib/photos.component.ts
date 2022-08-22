import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { lastValueFrom } from 'rxjs';
import { Photos } from '@edwin/photos/shared';

/** Helper function that shuffles an array */
function shuffle<T>(array: Array<T>): Array<T> {
  return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

@Component({
  selector: 'edwin-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [
        animate('3s ease-in-out'),
      ]),
    ]),
  ],
})
export class PhotosComponent {
  /** All of the photos */
  photos: string[] = [];

  /** The photo that will be displayed next, for pre-loading */
  next?: string;

  /** The currently displayed photo in the photos array */
  index = 0;

  /** Timer for when to show the next photo */
  timer?: number;

  /** The current date */
  now = Date.now();

  /** Gets the safe src tag for an image */
  src = (name: string): SafeResourceUrl => this.sanitizer.bypassSecurityTrustResourceUrl(`/api/photos/${name}`);

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.init();
    setInterval(() => { this.now = Date.now(); }, 1000);
  }

  /** Gets the index of a move */
  getMoveIndex(mode: 'next' | 'back'): number {
    const index = mode === 'next' ? this.index + 1 : this.index - 1;

    if (index >= this.photos.length) {
      return 0;
    } if (index < 0) {
      return this.photos.length - 1;
    }
    return index;
  }

  /** Moves to either the next or previous photo */
  move(mode: 'next' | 'back'): void {
    // Clear the current timeout
    window.clearTimeout(this.timer);

    // Move the photo
    this.index = this.getMoveIndex(mode);

    // Prefetch the next photo
    this.next = this.photos[this.getMoveIndex(mode)];

    // Queue up the next move
    this.timer = window.setTimeout(() => this.move('next'), 15000);
  }

  /** Initializes the photo queue */
  async init(): Promise<void> {
    // Get all of the photos
    const request = this.http.get<Photos>('/api/photos');
    const photos = await lastValueFrom(request);
    this.photos = shuffle(photos);

    // If there are no photos, try again in 1 minute
    if (!this.photos.length) {
      setTimeout(() => this.init(), 60000);
    } else {
      this.move('next');
    }
  }
}
