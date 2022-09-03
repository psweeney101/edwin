import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'time', loadChildren: () => import('@edwin/time/ui').then(m => m.TimeModule) },
  { path: 'photos', loadChildren: () => import('@edwin/photos/ui').then(m => m.PhotosModule) },
  { path: 'wifi', loadChildren: () => import('@edwin/wifi/ui').then(m => m.WifiModule) },
  { path: 'explorer', loadChildren: () => import('@edwin/explorer/ui').then(m => m.ExplorerModule) },
  { path: '', pathMatch: 'full', redirectTo: '/time' },
  { path: '**', redirectTo: 'time' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
