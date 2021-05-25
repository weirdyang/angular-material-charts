import { Component, OnInit } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { OrderService } from 'src/app/order/order.service';
import { defaultColor } from '../config';
import { Order } from '../../order/order';
import { of, zip } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ScaleType } from 'chart.js';



@Component({
  selector: 'cd-product-bar-chart',
  templateUrl: './product-bar-chart.component.html',
  styleUrls: ['./product-bar-chart.component.scss']
})

export class ProductBarChartComponent implements OnInit {
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

  constructor(private orderService: OrderService) {
    this.setColorScheme('cool');
  }

  ngOnInit(): void {
    // setTimeout(() => this.setColorScheme(defaultColor));
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
  setColorScheme(name: string) {
    this.colorScheme = colorSets.find(s => s.name === name);
  }
  onSelect(event: Event) {
    console.log(event);
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
