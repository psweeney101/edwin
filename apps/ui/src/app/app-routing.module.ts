import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'explorer', loadChildren: () => import('@edwin/explorer/ui').then(m => m.ExplorerModule) },
  { path: 'jukebox', loadChildren: () => import('@edwin/jukebox/ui').then(m => m.JukeboxModule) },
  { path: 'photos', loadChildren: () => import('@edwin/photos/ui').then(m => m.PhotosModule) },
  { path: 'time', loadChildren: () => import('@edwin/time/ui').then(m => m.TimeModule) },
  { path: 'wifi', loadChildren: () => import('@edwin/wifi/ui').then(m => m.WifiModule) },
  { path: '', pathMatch: 'full', redirectTo: '/time' },
  { path: '**', redirectTo: 'time' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
