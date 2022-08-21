import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeComponent } from './time.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TimeComponent,
  ],
  exports: [
    TimeComponent,
  ],
})
export class TimeModule { }
