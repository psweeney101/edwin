import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotosModule } from '@edwin/photos/ui';
import { TimeModule } from '@edwin/time/ui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,

    TimeModule,
    PhotosModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
