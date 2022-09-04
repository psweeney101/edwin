import { Module } from '@nestjs/common';
import { JukeboxController } from './jukebox.controller';
import { JukeboxService } from './jukebox.service';

@Module({
  controllers: [JukeboxController],
  providers: [JukeboxService],
  exports: [JukeboxService],
})
export class JukeboxModule {}
