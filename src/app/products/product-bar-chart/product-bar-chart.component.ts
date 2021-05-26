import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { OrderService } from 'src/app/order/order.service';
import { defaultColor } from '../config';
import { Order } from '../../order/order';
import { interval, of, Subscription, zip } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ScaleType } from 'chart.js';



@Component({
  selector: 'cd-product-bar-chart',
  templateUrl: './product-bar-chart.component.html',
  styleUrls: ['./product-bar-chart.component.scss']
})

export class ProductBarChartComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {
  single: any[] = [];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Payment Mode';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  colorScheme: any;
  subscription!: Subscription;

  constructor(private orderService: OrderService, private changeDetector: ChangeDetectorRef) {
    this.setColorScheme(defaultColor);
    this.getDataSource();
  }
  ngAfterContentChecked(): void {

    // this.changeDetector.detectChanges();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }


  ngAfterViewInit(): void {
    this.subscription = interval(1000).subscribe({
      next: () => this.getDataSource()
    })
  }

  ngOnInit(): void {

  }
  setColorScheme(name: string) {
    this.colorScheme = colorSets.find(s => s.name === name);
  }
  onSelect(event: Event) {
    console.log(event);
  }
  getDataSource() {
    const data: any[] = [];
    this.orderService.getRandomOrders(10)
      .pipe(
        mergeMap(res => res),
        groupBy(order => order.paymentMode),
        mergeMap(group => zip(of(group.key), group.pipe(toArray())))
      ).subscribe({
        next: (val) => {
          data.push({ name: val[0], value: val[1].length })
        },
        error: console.error,
        complete: () => this.single = [...data]
      });
  }
  groupByProperty(prop: string, array: any[]) {
    return array.reduce((acc, value) => {
      if (!acc[value[prop]]) {
        acc[value[prop]] = [];
      }
      acc[prop].push(value);
    }, {})
  }
}
