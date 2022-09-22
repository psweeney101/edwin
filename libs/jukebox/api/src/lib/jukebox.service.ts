import { randomUUID } from 'crypto';
import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { environment } from '@edwin/environments/api';
import {
  Player, Queue, SearchResults, SET_STATE_TIMEOUT, SpotifyTrack,
} from '@edwin/jukebox/shared';

@Injectable()
export class JukeboxService {
  /** The currently playback state */
  private player: Player = null;

  /** The queue of songs up next */
  private queue: Queue = [];

  /** The user's refresh token */
  private refresh_token? = environment.SPOTIFY_REFRESH_TOKEN;

  /** The user's access token */
  private access_token?: string;

  constructor() {
    this.setState();
  }

  /** Sets the state on an interval */
  private async setState(): Promise<void> {
    try {
      // Grab the player from Spotify
      const player = await this.dispatch<{ item: SpotifyTrack; progress_ms: number; is_playing: boolean; }>({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
      });

      // Set the player
      this.player = player ? {
        album: {
          id: player.item.album.id,
          name: player.item.album.name,
          image: player.item.album.images[0].url,
        },
        artist: {
          id: player.item.artists[0].id,
          name: player.item.artists[0].name,
        },
        id: player.item.id,
        name: player.item.name,
        duration_ms: player.item.duration_ms,
        progress_ms: player.progress_ms,
        is_playing: player.is_playing,
      } : null;

      // Grab the queue from Spotify
      const { queue } = await this.dispatch<{ queue: SpotifyTrack[]; }>({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/player/queue',
      });

      // Set the queue
      this.queue = queue.map(track => ({
        album: {
          id: track.album.id,
          name: track.album.name,
          image: track.album.images[0].url,
        },
        artist: {
          id: track.artists[0].id,
          name: track.artists[0].name,
        },
        id: track.id,
        name: track.name,
        duration_ms: track.duration_ms,
      }));
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => this.setState(), SET_STATE_TIMEOUT);
  }

  /** Redirects the user to Spotify's login page */
  login(): { url: string } {
    const scope = ['user-read-playback-state', 'user-modify-playback-state'].join(' ');
    const state = randomUUID();

    const url = new URL('https://accounts.spotify.com/authorize');
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('client_id', environment.SPOTIFY_CLIENT_ID);
    url.searchParams.append('scope', scope);
    url.searchParams.append('redirect_uri', `${environment.API_URL}/api/jukebox/callback`);
    url.searchParams.append('state', state);
    return { url: url.toString() };
  }

  /** Spotify invokes this method after the user logs in */
  async callback(code: string): Promise<{ url: string }> {
    const { data } = await axios.post<
    { access_token: string; token_type: 'Bearer'; scope: string; expires_in: number; refresh_token: string; }
    >(
      'https://accounts.spotify.com/api/token',
      encodeURI(`grant_type=authorization_code&code=${code}&redirect_uri=${environment.API_URL}/api/jukebox/callback`),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${environment.SPOTIFY_CLIENT_ID}:${environment.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;

    return { url: `${environment.UI_URL}/jukebox` };
  }

  /** Refreshes the access token */
  async refresh(): Promise<void> {
    if (!this.refresh_token) {
      throw new HttpException('User must login to continue.', 400);
    }
    const { data } = await axios.post<{ access_token: string; token_type: 'Bearer'; scope: string; expires_in: number; }>(
      'https://accounts.spotify.com/api/token',
      encodeURI(`grant_type=refresh_token&refresh_token=${this.refresh_token}`),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${environment.SPOTIFY_CLIENT_ID}:${environment.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    this.access_token = data.access_token;
  }

  /** Gets the user's current playback state */
  getPlayer(): Player {
    return this.player;
  }

  /** Pauses the player */
  async pause(): Promise<void> {
    await this.dispatch({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/pause',
    });
    if (this.player) {
      this.player.is_playing = false;
    }
  }

  /** Resumes the player */
  async play(): Promise<void> {
    await this.dispatch({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/play',
    });
    if (this.player) {
      this.player.is_playing = true;
    }
  }

  /** Skips to the next song */
  async next(): Promise<void> {
    await this.dispatch({
      method: 'post',
      url: 'https://api.spotify.com/v1/me/player/next',
    });
    if (this.player) {
      const track = this.queue.shift();
      this.player = track ? { ...track, is_playing: true, progress_ms: 0 } : null;
    }
  }

  /** Skips to the previous song */
  async previous(): Promise<void> {
    await this.dispatch({
      method: 'post',
      url: 'https://api.spotify.com/v1/me/player/previous',
    });
  }

  /** Seeks to a position in the current track */
  async seek(position_ms: string): Promise<void> {
    await this.dispatch({
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/seek?position_ms=${position_ms}`,
    });
    if (this.player) {
      this.player.progress_ms = Number(position_ms);
    }
  }

  /** Gets the user's current queue */
  getQueue(): Queue {
    return this.queue;
  }

  /** Searches for matching tracks */
  async search(query: string): Promise<SearchResults> {
    const { tracks: { items } } = await this.dispatch<{ tracks: { items: SpotifyTrack[]; }; }>({
      method: 'get',
      url: `https://api.spotify.com/v1/search?type=track&q=${query}`,
    });
    return items.map(track => ({
      album: {
        id: track.album.id,
        name: track.album.name,
        image: track.album.images[0].url,
      },
      artist: {
        id: track.artists[0].id,
        name: track.artists[0].name,
      },
      id: track.id,
      name: track.name,
      duration_ms: track.duration_ms,
    }));
  }

  /** Adds a track to the queue */
  async add(id: string): Promise<void> {
    await this.dispatch({
      method: 'post',
      url: `https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${id}`,
    });
  }

  /** Helper function for invoking a Spotify API endpoint */
  async dispatch<T extends object>(config: AxiosRequestConfig): Promise<T> {
    // Get an access token if there isn't already one
    if (!this.access_token) {
      await this.refresh();
    }

    // Set the authorization header
    Object.assign(config, {
      headers: { Authorization: `Bearer ${this.access_token}` },
    });

    try {
      // Invoke call
      const response = await axios(config);

      // Return data
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const code = error.response?.status;
        // The access token expired
        if (code === 401) {
          this.access_token = undefined;
          return this.dispatch(config);
        }
        // Too Many Requests
        if (code === 429) {
          const retryAfter = (Number(error.response?.headers?.['retry-after'] || 0) + 1) * 1000;
          console.error(`Spotify: Too Many Requests. Trying again in ${retryAfter / 1000} seconds...`);
          await new Promise(resolve => { setTimeout(resolve, (retryAfter)); });
          return this.dispatch(config);
        }
      }

      throw error;
    }
  }
}
