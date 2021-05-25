import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDoughnutChartComponent } from './order-charts/order-doughnut-chart/order-doughnut-chart.component';
import { ChartsModule } from 'ng2-charts';
import { OrderBarChartComponent } from './order-charts/order-bar-chart/order-bar-chart.component';
import { OrderPieChartComponent } from './order-charts/order-pie-chart/order-pie-chart.component';
import { OrderColorChartComponent } from './order-charts/order-color-chart/order-color-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderDashComponent } from './order-dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewOrderTableComponent } from './new-order-table/new-order-table.component';



@NgModule({
  declarations: [
    OrderDoughnutChartComponent,
    OrderBarChartComponent,
    OrderPieChartComponent,
    OrderColorChartComponent,
    OrderDashComponent,
    NewOrderTableComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class OrderDashModule { }
