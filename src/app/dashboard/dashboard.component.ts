import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { StoreSummary } from '../services/store-summary';
import { StoreSummaryService } from '../services/store-summary.service';
import { AnnualSalesChartComponent } from '../charts/annual-sales-chart/annual-sales-chart.component';
import { ProductSalesChartComponent } from '../charts/product-sales-chart/product-sales-chart.component';
import { SalesTrafficChartComponent } from '../charts/sales-traffic-chart/sales-traffic-chart.component';
import { StoreSessionsChartComponent } from '../charts/store-sessions-chart/store-sessions-chart.component';
import { LayoutContainer } from '../shared/interfaces/layout';

@Component({
  selector: 'cd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  miniCardData!: StoreSummary[];
  /** Based on the screen size, switch from standard to one column per row */
  constructor(private breakpointObserver: BreakpointObserver, private summaryService: StoreSummaryService) { }
  ngOnInit(): void {
    this.summaryService.getStoreSummary().subscribe({
      next: summaryData => {
        this.miniCardData = summaryData;
      }
    });
  }
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
                component: AnnualSalesChartComponent,
              },
              {
                title: 'Product Sales',
                component: ProductSalesChartComponent,
              },
              {
                title: 'Sales Traffic by Source',
                component: SalesTrafficChartComponent,
              },
              {
                title: 'Store Sessions by Source',
                component: StoreSessionsChartComponent
              }]
          },
          table: { cols: 1, rows: 4, data: [9] },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1, data: [1, 2, 3, 4] },
        chart: {
          cols: 2, rows: 2, data:
            [{
              title: 'Annual Sales',
              component: AnnualSalesChartComponent,
            },
            {
              title: 'Product Sales',
              component: ProductSalesChartComponent,
            },
            {
              title: 'Sales Traffic by Source',
              component: SalesTrafficChartComponent,
            },
            {
              title: 'Store Sessions by Source',
              component: StoreSessionsChartComponent
            }],
        },
        table: { cols: 4, rows: 4, data: [9] },
      };
    })
  );
}
