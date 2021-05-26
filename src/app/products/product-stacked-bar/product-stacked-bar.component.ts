import { Component, OnInit } from '@angular/core';
import { colorSets, MultiSeries, Color } from '@swimlane/ngx-charts';
import { interval, Subscription } from 'rxjs';
import { defaultColor } from '../config';

@Component({
  selector: 'cd-product-stacked-bar',
  templateUrl: './product-stacked-bar.component.html',
  styleUrls: ['./product-stacked-bar.component.scss']
})
export class ProductStackedBarComponent implements OnInit {
  multi!: any[];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  animations: boolean = true;
  seed = 2014;
  colorScheme?: Color;
  subscription!: Subscription;
  machineNames = ['Machine A', 'Machine B', 'Machine C'];
  constructor() {
    this.multi = this.getData();
    this.setColorScheme(defaultColor);
  }
  ngOnInit(): void {
    this.subscription = interval(1500).subscribe(() => this.multi = this.updateData());
  }
  setColorScheme(name: string) {
    this.colorScheme = colorSets.find(s => s.name === name);
  }
  updateData(): MultiSeries {
    const currentDate = new Date(this.seed,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 30),
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 10))
    // const updated = [...this.multi];
    this.multi.shift();
    const newEntry = {
      name: currentDate.toDateString(),
      series: new Array<any>()
    }
    this.machineNames.forEach((name) => newEntry.series.push(
      {
        name: name,
        value: Math.floor(Math.random() * 50000),
      }));
    this.seed += 1;

    return [...this.multi, newEntry];
  }
  onSelect(event: any) {
    console.log(event);
  }
  getData(): MultiSeries {
    const first = new Date(2011, 10, 30, 1, 10, 10);
    const second = new Date(2012, 10, 30, 1, 10, 10);
    const third = new Date(2013, 10, 30, 1, 10, 10);
    return [
      {
        "name": first.toDateString(),
        "series": [
          {
            "name": 'Machine A',
            "value": 7300000
          },
          {
            "name": "Machine B",
            "value": 8940000
          }
        ]
      },

      {
        "name": second.toDateString(),
        "series": [
          {
            "name": 'Machine A',
            "value": 7300000
          },
          {
            "name": "Machine B",
            "value": 8940000
          }
        ]
      },

      {
        "name": third.toDateString(),
        "series": [
          {
            "name": 'Machine A',
            "value": 7300000
          },
          {
            "name": "Machine B",
            "value": 8940000
          }
        ]
      }]
  }
}
