import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WifiComponent } from './wifi.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    WifiComponent,
  ],
  exports: [
    WifiComponent,
  ],
})
export class WifiModule { }
