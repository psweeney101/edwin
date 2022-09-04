import {
  Controller, Get, Post, Put, Query, Redirect,
} from '@nestjs/common';
import { Player, Queue, SearchResults } from '@edwin/jukebox/shared';
import { JukeboxService } from './jukebox.service';

@Controller('jukebox')
export class JukeboxController {
  constructor(private readonly jukeboxService: JukeboxService) { }

  @Get('login')
  @Redirect()
  login(): { url: string } {
    return this.jukeboxService.login();
  }

  @Get('callback')
  @Redirect()
  callback(@Query('code') code: string): Promise<{ url: string }> {
    return this.jukeboxService.callback(code);
  }

  @Get('player')
  getPlayer(): Player {
    return this.jukeboxService.getPlayer();
  }

  @Put('player/pause')
  pause(): Promise<void> {
    return this.jukeboxService.pause();
  }

  @Put('player/play')
  play(): Promise<void> {
    return this.jukeboxService.play();
  }

  @Post('player/next')
  next(): Promise<void> {
    return this.jukeboxService.next();
  }

  @Post('player/previous')
  previous(): Promise<void> {
    return this.jukeboxService.previous();
  }

  @Put('player/seek')
  seek(@Query('position_ms') position_ms: string): Promise<void> {
    return this.jukeboxService.seek(position_ms);
  }

  @Get('queue')
  getQueue(): Queue {
    return this.jukeboxService.getQueue();
  }

  @Get('search')
  search(@Query('query') query: string): Promise<SearchResults> {
    return this.jukeboxService.search(query);
  }

  @Post('add')
  add(@Query('id') id: string): Promise<void> {
    return this.jukeboxService.add(id);
  }
}
