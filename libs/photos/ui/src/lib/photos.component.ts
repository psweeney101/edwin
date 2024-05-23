import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { lastValueFrom } from 'rxjs';
import { Photo } from '@edwin/photos/shared';

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
export class PhotosComponent implements OnInit, OnDestroy {
  /** All of the photos */
  private photos: Photo[] = [];

  /** The index of the currently displayed photo in the photos array */
  private index = 0;

  /** Timer for when to show the next photo */
  private timer?: number;

  /** Photos currently rendered on the DOM */
  slideshow?: [Photo, Photo, Photo];

  /** The current date */
  now = Date.now();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    setInterval(() => { this.now = Date.now(); }, 1000);
  }

  async ngOnInit(): Promise<void> {
    // Get all of the photos
    const request = this.http.get<Photo[]>('/api/photos');
    const photos = await lastValueFrom(request);

    // Shuffle the photos
    this.photos = photos.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    // If there are no photos, try again in 1 minute
    if (!this.photos.length) {
      setTimeout(() => this.ngOnInit(), 60000);
    } else {
      this.move('next');
    }
  }

  ngOnDestroy(): void {
    // Clear the current timeout
    window.clearTimeout(this.timer);
  }

  /** Moves to either the next or previous photo */
  move(direction: 'next' | 'prev'): void {
    // Clear the current timeout
    window.clearTimeout(this.timer);

    if (!this.slideshow) {
      // Initialize the slideshow
      this.slideshow = [
        this.getPhotoByMove('prev'),
        this.photos[this.index],
        this.getPhotoByMove('next'),
      ];
    } else {
      // Update the current index
      this.index = this.getIndexByMove(direction);

      // Add a photo to the queue
      if (direction === 'next') {
        this.slideshow.push(this.getPhotoByMove('next'));
        this.slideshow.shift();
      } else {
        this.slideshow.unshift(this.getPhotoByMove('prev'));
        this.slideshow.pop();
      }
    }

    // Queue up the next move
    this.timer = window.setTimeout(() => this.move('prev'), 15000);
  }

  /** Gets the safe URL of a photo */
  getSafeUrl(photo: Photo): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`/api/photos/${photo}`);
  }

  /** Gets the index of a move */
  private getIndexByMove(direction: 'next' | 'prev'): number {
    let index = direction === 'next' ? this.index + 1 : this.index - 1;

    if (index >= this.photos.length) {
      index = 0;
    } else if (index < 0) {
      index = this.photos.length - 1;
    }

    return index;
  }

  /** Gets the index of a move */
  private getPhotoByMove(direction: 'next' | 'prev'): Photo {
    return this.photos[this.getIndexByMove(direction)];
  }
}
