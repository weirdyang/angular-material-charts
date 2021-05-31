import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts';
import { groupBy, map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { OrderService } from 'src/app/order/order.service';
import { defaultColor } from '../config';
import { interval, of, Subscription, zip } from 'rxjs';




@Component({
  selector: 'cd-product-bar-chart',
  templateUrl: './product-bar-chart.component.html',
  styleUrls: ['./product-bar-chart.component.scss']
})

export class ProductBarChartComponent implements OnInit, OnDestroy, AfterContentInit {
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
  view: [number, number] | undefined;


  constructor(private orderService: OrderService) {
    this.setColorScheme(defaultColor);

  }


  ngAfterContentInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.subscription = interval(1000)
      .pipe(
        switchMap(val => this.getDataSource())
      ).subscribe(result => this.single = [...result]);
  }
  setColorScheme(name: string) {
    this.colorScheme = colorSets.find(s => s.name === name);
  }
  onSelect(event: Event) {
    console.log(event);
  }
  getDataSource() {

    return this.orderService.getRandomOrders(10)
      .pipe(
        mergeMap(res => res),
        groupBy(order => order.paymentMode),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        map(item => ({ name: item[0], value: item[1].length })),
        toArray(),
      )
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


