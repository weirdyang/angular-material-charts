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
  cardLayout: Observable<LayoutContainer> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 2, data: [{ title: "Light status", component: LightStatusComponent }] },
          chart: {
            cols: 1, rows: 2, data:
              this.chartSetup
          },
          table: { cols: 1, rows: 4, data: [{ title: "Machine Output", component: RevenueCalculatorComponent }] },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 4, rows: 2, data: [{ title: "Light status", component: LightStatusComponent }] },
        chart: {
          cols: 2, rows: 2, data:
            this.chartSetup
        },
        table: { cols: 4, rows: 4, data: [{ title: 'Machine Output', component: RevenueCalculatorComponent }] },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) { }
}

