import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { StoreSessionsChartComponent } from './store-sessions-chart/store-sessions-chart.component';
import { AnnualSalesChartComponent } from './annual-sales-chart/annual-sales-chart.component';
import { SalesTrafficChartComponent } from './sales-traffic-chart/sales-traffic-chart.component';
import { ProductSalesChartComponent } from './product-sales-chart/product-sales-chart.component';


@NgModule({
  declarations: [
    StoreSessionsChartComponent,
    AnnualSalesChartComponent,
    SalesTrafficChartComponent,
    ProductSalesChartComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    CommonModule,
    StoreSessionsChartComponent,
    AnnualSalesChartComponent,
    SalesTrafficChartComponent,
    ProductSalesChartComponent,
    ChartsModule
  ]
})
export class DashboardChartModule { }
