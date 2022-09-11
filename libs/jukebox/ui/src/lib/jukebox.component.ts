import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, lastValueFrom, switchMap } from 'rxjs';
import {
  Player, Queue, SearchResults, SET_STATE_TIMEOUT,
} from '@edwin/jukebox/shared';

@Component({
  selector: 'edwin-jukebox',
  templateUrl: './jukebox.component.html',
  styleUrls: ['./jukebox.component.css'],
})
export class JukeboxComponent implements OnInit {
  /** The currently playback state */
  player: Player = null;

  /** The queue of songs up next */
  queue: Queue = [];

  /** The form field control for the search */
  searchFormControl = new FormControl('');

  /** Search results */
  searchResults: SearchResults = [];

  /** Whether or not the sidenav is opened */
  opened = false;

  /** Whether or not the state has been loaded */
  loaded = false;

  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    await this.setState();
    this.loaded = true;

    this.searchFormControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(query => this.search(query)),
    ).subscribe(searchResults => { this.searchResults = searchResults; });
  }

  /** Sets the player and queue state */
  async setState(): Promise<void> {
    await Promise.all([
      this.player = await lastValueFrom(this.http.get<Player>('/api/jukebox/player')),
      this.queue = await lastValueFrom(this.http.get<Queue>('/api/jukebox/queue')),
    ]);
    setTimeout(() => this.setState(), SET_STATE_TIMEOUT);
  }

  /** Pauses the player */
  async pause(): Promise<void> {
    await lastValueFrom(this.http.put<void>('/api/jukebox/player/pause', null));
    if (this.player) {
      this.player.is_playing = false;
    }
  }

  /** Resumes the player */
  async play(): Promise<void> {
    await lastValueFrom(this.http.put<void>('/api/jukebox/player/play', null));
    if (this.player) {
      this.player.is_playing = true;
    }
  }

  /** Skips to the next song */
  async next(): Promise<void> {
    await lastValueFrom(this.http.post<void>('/api/jukebox/player/next', null));
    if (this.player) {
      const track = this.queue.shift();
      this.player = track ? { ...track, is_playing: true, progress_ms: 0 } : null;
    }
  }

  /** Skips to the previous song */
  async previous(): Promise<void> {
    await lastValueFrom(this.http.post<void>('/api/jukebox/player/previous', null));
  }

  /** Seeks to a position in the current track */
  async seek(position_ms: number | null): Promise<void> {
    if (typeof position_ms !== 'number') return;
    await lastValueFrom(this.http.put<void>(`/api/jukebox/player/seek?position_ms=${position_ms}`, null));
    if (this.player) {
      this.player.progress_ms = position_ms;
    }
  }

  /** Searches for a track */
  async search(query: string | null): Promise<SearchResults> {
    if (query) {
      const request = this.http.get<SearchResults>(`/api/jukebox/search?query=${query}`);
      const results = await lastValueFrom(request);
      return results;
    }
    return [];
  }

  /** Adds a track to the queue */
  async add(id: string): Promise<void> {
    this.searchFormControl.setValue('');
    this.opened = false;
    await lastValueFrom(this.http.post<void>(`/api/jukebox/add?id=${id}`, null));
  }
}
