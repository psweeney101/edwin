import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ExplorerRoutingModule } from './explorer-routing.module';
import { ExplorerComponent } from './explorer.component';

@NgModule({
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    MatButtonModule,
  ],
  declarations: [
    ExplorerComponent,
  ],
})
export class ExplorerModule { }
