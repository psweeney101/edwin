import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotosComponent } from './photos.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PhotosComponent,
  ],
  exports: [
    PhotosComponent,
  ],
})
export class PhotosModule { }
