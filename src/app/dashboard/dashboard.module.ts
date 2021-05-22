import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniCardComponent } from '../shared/mini-card/mini-card.component';
import { DashboardChartModule } from '../charts/dashboard-chart.module';
import { DashboardComponent } from './dashboard.component';
import { CardComponent } from '../shared/card/card.component';
import { OrdersTableComponent } from '../order/orders-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { TemplateCardComponent } from '../shared/template-card/template-card.component';
import { ComponentWrapperComponent } from '../shared/component-wrapper/component-wrapper.component';
import { WrapperDirective } from '../shared/wrapper.directive';

@NgModule({
  declarations: [
    MiniCardComponent,
    DashboardComponent,
    CardComponent,
    OrdersTableComponent,
    MiniCardComponent,
    TemplateCardComponent,
    ComponentWrapperComponent,
    WrapperDirective,
  ],
  imports: [
    CommonModule,
    DashboardChartModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSortModule,
    MatTableModule,
  ],
  exports: [
    DashboardChartModule,
    DashboardComponent,
    WrapperDirective
  ]
})
export class DashboardModule { }
