import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { StoreSummary } from '../services/store-summary';
import { StoreSummaryService } from '../services/store-summary.service';
interface LayoutOutContainer {
  columns: number;
  miniCard: LayoutItem;
  chart: LayoutItem;
  table: LayoutItem;
}
interface LayoutItem {
  cols: number;
  rows: number;
  data: any[];
}
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
  cardLayout: Observable<LayoutOutContainer> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1, data: [1, 2, 3, 4] },
          chart: { cols: 1, rows: 2, data: [5, 6, 7, 8] },
          table: { cols: 1, rows: 4, data: [9] },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1, data: [1, 2, 3, 4] },
        chart: { cols: 2, rows: 2, data: [5, 6, 7, 8] },
        table: { cols: 4, rows: 4, data: [9] },
      };
    })
  );
}
