import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/order/order';
import { OrderService } from 'src/app/order/order.service';
import { IObjectKeys } from 'src/app/shared/interfaces/layout';

class PaymentCount implements IObjectKeys {
  [key: string]: string | number | boolean;

}
@Component({
  selector: 'cd-order-bar-chart',
  templateUrl: './order-bar-chart.component.html',
  styleUrls: ['./order-bar-chart.component.scss']
})
export class OrderBarChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: any[] = [];
  public barChartData: ChartDataSets[] = [{
    label: "Total Payment Mode Count",
    data: [],
  }]

  constructor(private orderService: OrderService) { }

  private orders: Order[] = [];

  ngOnInit() {
    const orders = this.getInitialData();
    orders
      .subscribe({
        next: items => {
          this.processOrders(items);
        },
        error: err => console.log(err),
        complete: () => setInterval(() => this.getRandomData(10), 10000)
      })

  }
  getColors(): any[] {
    return [{
      backgroundColor: [
        '#a6cee3',
        '#1f78b4',
        '#b2df8a',
        '#33a02c',
        '#fb9a99',
        '#e31a1c',
        '#fdbf6f',
        '#ff7f00',
        '#cab2d6',
        '#6a3d9a']
    }]
  }
  // getRandomData(): Observable<Order[]> {
  //   return this.orderService.getRandomOrders(10)
  //   .subscribe(

  //   })
  // }
  processOrders(orders: Order[]): void {
    const labels = this.getLabels(orders);
    const totals = this.getTotal(orders);
    const dataArray = [];
    for (const name of labels) {
      dataArray.push(+totals[name]);
    }
    this.barChartData = [{
      label: "payment modes count",
      data: dataArray
    }]
    this.barChartLabels = labels;
    this.barChartColors = this.getColors();
    console.log(this.barChartData);
  }

  getRandomData(records: number) {
    return this.orderService.getRandomOrders(records)
      .subscribe({
        next: (items) => this.processOrders(items),
        error: (err) => console.error(err),
      })
  }
  getInitialData(): Observable<Order[]> {
    return this.orderService.getLastOrders(10);
  }
  getLabels(orders: Order[]): string[] {
    return orders.map((order) => order.paymentMode);
  }
  getTotal(orders: Order[]): PaymentCount {
    return orders.map((or) => or.paymentMode).reduce((names, name) => {
      const count = +(names[name] || 0);
      names[name] = count + 1;
      return names;
    }, new PaymentCount());
  }
}
