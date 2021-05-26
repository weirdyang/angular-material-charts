import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBarChartComponent } from './product-bar-chart/product-bar-chart.component';
import { ProductGaugeChartComponent } from './product-gauge-chart/product-gauge-chart.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductNumberCardComponent } from './product-number-card/product-number-card.component';
import { RevenueCalculatorComponent } from './revenue-calculator/revenue-calculator.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ProductStackedBarComponent } from './product-stacked-bar/product-stacked-bar.component';



@NgModule({
  declarations: [
    ProductBarChartComponent,
    ProductGaugeChartComponent,
    ProductCardComponent,
    ProductDashboardComponent,
    ProductNumberCardComponent,
    RevenueCalculatorComponent,
    ProductStackedBarComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule
  ]
})
export class ProductModule { }
