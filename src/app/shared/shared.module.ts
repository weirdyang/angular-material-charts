import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';
import { WrapperDirective } from './wrapper.directive';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



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
  ],
  exports: [
    ComponentWrapperComponent,
    WrapperDirective,
    CardComponent,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
  ]
})
export class SharedModule { }
