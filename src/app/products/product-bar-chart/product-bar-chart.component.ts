import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { OrderService } from 'src/app/order/order.service';
import { defaultColor } from '../config';
import { interval, of, Subscription, zip } from 'rxjs';




@Component({
  selector: 'cd-product-bar-chart',
  templateUrl: './product-bar-chart.component.html',
  styleUrls: ['./product-bar-chart.component.scss']
})

export class ProductBarChartComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
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
  view: [number, number] = [300, 300];
  @ViewChild('ContainerRef') container!: ElementRef<HTMLElement>;
  constructor(private orderService: OrderService) {

  }
  ngAfterViewInit(): void {
    console.log(this.container);
    console.log(this.container.nativeElement.offsetWidth, 'offset width');
    const newView: [number, number] = [this.container.nativeElement.offsetWidth, 300];
    this.view = newView;

    const test = of(this.container).subscribe((ele) => console.log(ele.nativeElement.offsetWidth));

  }
  ngAfterContentInit(): void {

    this.setColorScheme(defaultColor);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }


  ngOnInit(): void {
    this.getDataSource();
    this.subscription = interval(1000).subscribe({
      next: () => this.getDataSource()
    })
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


