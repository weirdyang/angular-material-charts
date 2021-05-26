import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LayoutContainer } from 'src/app/shared/interfaces/layout';
import { Observable } from 'rxjs';
import { ProductBarChartComponent } from '../product-bar-chart/product-bar-chart.component';
import { ProductGaugeChartComponent } from '../product-gauge-chart/product-gauge-chart.component';
import { ProductPieChartComponent } from '../product-pie-chart/product-pie-chart.component';

@Component({
  selector: 'cd-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  chartSetup = [{
    title: 'Annual Sales',
    component: ProductBarChartComponent,
  },
  {
    title: 'Product Sales',
    component: ProductGaugeChartComponent,
  },
  {
    title: 'Sales Traffic by Source',
    component: ProductPieChartComponent,
  },
  {
    title: 'Store Sessions by Source',
    component: ProductBarChartComponent
  }]
  cardLayout: Observable<LayoutContainer> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1, data: [1, 2, 3, 4] },
          chart: {
            cols: 1, rows: 2, data:
              this.chartSetup
          },
          table: { cols: 1, rows: 4, data: [{ title: "Latest 10 Orders", component: '' }] },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1, data: [1, 2, 3, 4] },
        chart: {
          cols: 2, rows: 2, data:
            this.chartSetup
        },
        table: { cols: 4, rows: 4, data: [] },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) { }
}

