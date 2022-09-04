import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JukeboxComponent } from './jukebox.component';

const routes: Routes = [
  { path: '', component: JukeboxComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JukeboxRoutingModule { }
