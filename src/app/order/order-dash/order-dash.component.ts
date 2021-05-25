import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { LayoutContainer } from 'src/app/shared/interfaces/layout';
import { NewOrderTableComponent } from './new-order-table/new-order-table.component';
import { OrderBarChartComponent } from './order-charts/order-bar-chart/order-bar-chart.component';
import { OrderColorChartComponent } from './order-charts/order-color-chart/order-color-chart.component';
import { OrderPieChartComponent } from './order-charts/order-pie-chart/order-pie-chart.component';
import { OrderDoughnutChartComponent } from './order-charts/order-doughnut-chart/order-doughnut-chart.component';

@Component({
  selector: 'cd-order-dash',
  templateUrl: './order-dash.component.html',
  styleUrls: ['./order-dash.component.scss']
})
export class OrderDashComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout: Observable<LayoutContainer> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1, data: [1, 2, 3, 4] },
          chart: {
            cols: 1, rows: 2, data:
              [{
                title: 'Annual Sales',
                component: OrderBarChartComponent,
              },
              {
                title: 'Product Sales',
                component: OrderColorChartComponent,
              },
              {
                title: 'Sales Traffic by Source',
                component: OrderDoughnutChartComponent,
              },
              {
                title: 'Store Sessions by Source',
                component: OrderPieChartComponent
              }]
          },
          table: { cols: 1, rows: 4, data: [{title: "Latest 10 Orders", component: NewOrderTableComponent}] },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1, data: [1, 2, 3, 4] },
        chart: {
          cols: 2, rows: 2, data:
            [{
              title: 'Annual Sales',
              component: OrderBarChartComponent,
            },
            {
              title: 'Product Sales',
              component: OrderColorChartComponent,
            },
            {
              title: 'Sales Traffic by Source',
              component: OrderDoughnutChartComponent,
            },
            {
              title: 'Store Sessions by Source',
              component: OrderPieChartComponent
            }],
        },
        table: { cols: 4, rows: 4, data: [NewOrderTableComponent] },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) { }
}
