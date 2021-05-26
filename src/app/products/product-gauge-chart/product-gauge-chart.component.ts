import { Component, OnDestroy, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'cd-product-gauge-chart',
  templateUrl: './product-gauge-chart.component.html',
  styleUrls: ['./product-gauge-chart.component.scss']
})
export class ProductGaugeChartComponent implements OnDestroy, OnInit {
  single!: any[];
  legend: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  subscription!: Subscription;
  constructor() {

  }
  ngOnInit(): void {
    this.setUp();
    this.subscription = interval(1000).subscribe(() => this.setUp())
  }

  setUp() {
    this.single = [{
      "name": "OEE",
      "value": +(Math.random() * 100).toFixed(2)
    }]
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  formatValue(data: number) {
    return `${data}% OEE`
  }
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}

