import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { JukeboxRoutingModule } from './jukebox-routing.module';
import { JukeboxComponent } from './jukebox.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JukeboxRoutingModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSliderModule,
  ],
  declarations: [
    JukeboxComponent,
  ],
})
export class JukeboxModule { }
