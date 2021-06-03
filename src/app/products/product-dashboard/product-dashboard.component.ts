import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LayoutContainer } from 'src/app/shared/interfaces/layout';
import { Observable } from 'rxjs';
import { ProductBarChartComponent } from '../product-bar-chart/product-bar-chart.component';
import { ProductGaugeChartComponent } from '../product-gauge-chart/product-gauge-chart.component';
import { ProductNumberCardComponent } from '../product-number-card/product-number-card.component';
import { RevenueCalculatorComponent } from '../revenue-calculator/revenue-calculator.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductStackedBarComponent } from '../product-stacked-bar/product-stacked-bar.component';
import { LightStatusComponent } from '../light-status/light-status.component';

@Component({
  selector: 'cd-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss', '../../products/styles.scss']
})
export class ProductDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  chartSetup = [{
    title: 'Last Ten Payment Modes',
    component: ProductBarChartComponent,
  },
  {
    title: 'OEE',
    component: ProductGaugeChartComponent,
  },
  {
    title: 'Production',
    component: ProductStackedBarComponent,
  },
  {
    title: 'Production Hours',
    component: ProductNumberCardComponent
  }]

  lightStatus = [{ title: "Light status", component: LightStatusComponent }]

  revenueCalculator = [{ title: 'Machine Output', component: RevenueCalculatorComponent }]
  cardLayout: Observable<LayoutContainer> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Medium]).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          top: { cols: 1, rows: 2, data: this.lightStatus },
          middle: {
            cols: 1, rows: 2, data:
              this.chartSetup
          },
          bottom: { cols: 1, rows: 4, data: this.revenueCalculator },
        };
      }

      return {
        columns: 4,
        top: { cols: 4, rows: 2, data: this.lightStatus },
        middle: {
          cols: 2, rows: 2, data:
            this.chartSetup
        },
        bottom: { cols: 4, rows: 4, data: this.revenueCalculator },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) { }
}

