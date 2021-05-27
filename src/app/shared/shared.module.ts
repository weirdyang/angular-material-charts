import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';
import { WrapperDirective } from './wrapper.directive';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    ComponentWrapperComponent,
    WrapperDirective,
    CardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    ComponentWrapperComponent,
    WrapperDirective,
    CardComponent,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class SharedModule { }
