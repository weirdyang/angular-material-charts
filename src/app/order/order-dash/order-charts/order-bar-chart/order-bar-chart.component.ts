import {  Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { interval, Observable, of, Subscription, zip } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
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
export class OrderBarChartComponent implements OnInit, OnDestroy {
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
  public barChartColors: any[] = [{
    backgroundColor: []
  }];
  public barChartData: ChartDataSets[] = [{
    label: "Total Payment Mode Count",
    data: [],
  }]
  subscription!: Subscription

  constructor(private orderService: OrderService) {

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  private orders: Order[] = [];

  ngOnInit() {
    this.getDataSource();
    this.subscription = interval(1000).subscribe({
      next: () => this.getDataSource()
    });
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
  getDataSource() {
    const data: any[] = [];
    const labels: string[] = [];
    this.orderService.getRandomOrders(10)
      .pipe(
        mergeMap(res => res),
        groupBy(order => order.paymentMode),
        mergeMap(group => zip(of(group.key), group.pipe(toArray())))
      ).subscribe({
        next: (val) => {
          data.push(val[1].length);
          labels.push(val[0])
        },
        error: console.error,
        complete: () => {
          this.barChartData = [{
            label: "payment modes count",
            data: data
          }]
          this.barChartLabels = labels;
          this.barChartColors = this.getColors();
        }
      });
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
