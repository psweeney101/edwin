export type SpotifyTrack = {
  album: { id: string; name: string; images: { url: string; }[]; };
  artists: { id: string; name: string; }[];
  duration_ms: number;
  id: string;
  name: string;
};

export type Track = {
  album: {
    id: string;
    name: string;
    image: string;
  };
  artist: {
    id: string;
    name: string;
  };
  id: string;
  name: string;
  duration_ms: number;
};

export type Player = (Track & {
  progress_ms: number;
  is_playing: boolean;
}) | null;

export type Queue = Track[];

export type SearchResults = Track[];

export const SET_STATE_TIMEOUT = 1000;
