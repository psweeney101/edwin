import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeRoutingModule } from './time-routing.module';
import { TimeComponent } from './time.component';

@NgModule({
  imports: [
    CommonModule,
    TimeRoutingModule,
  ],
  declarations: [
    TimeComponent,
  ],
})
export class TimeModule { }
