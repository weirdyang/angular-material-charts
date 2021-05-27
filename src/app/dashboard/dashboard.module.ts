import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { DashboardChartModule } from '../charts/dashboard-chart.module';
import { DashboardComponent } from './dashboard.component';
import { OrdersTableComponent } from '../order/orders-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { WrapperDirective } from '../shared/wrapper.directive';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    MiniCardComponent,
    DashboardComponent,
    OrdersTableComponent,
    MiniCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardChartModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSortModule,
    MatTableModule,
    SharedModule,
    DashboardRoutingModule,
  ],
  exports: [
    DashboardChartModule,
    DashboardComponent,
    WrapperDirective
  ]
})
export class DashboardModule { }
