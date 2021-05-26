import { Component, OnDestroy, OnInit } from '@angular/core';
import { Color, colorSets, MultiSeries, ScaleType } from '@swimlane/ngx-charts';
import { interval, Subscription } from 'rxjs';
import { defaultColor } from '../config';


@Component({
  selector: 'cd-revenue-calculator',
  templateUrl: './revenue-calculator.component.html',
  styleUrls: ['./revenue-calculator.component.scss']
})
export class RevenueCalculatorComponent implements OnInit, OnDestroy {


  colorScheme?: Color;
  schemeType: ScaleType = ScaleType.Linear
  maxReference: number = 90000;
  minReference: number = 45000;
  showGridLines = true;
  showLegend = true;
  xAxisLabel = 'Time'
  yAxisLabel = 'Output'
  showRefLines = true;
  showRefLabels = true;
  autoScale = false;
  yScaleMax = 100000;
  timeline = true;
  seed = 2014
  multi!: MultiSeries;
  subscription!: Subscription
  // Supports any number of reference lines.
  refLines = [
    { value: 90000, name: 'Maximum' },
    { value: 65000, name: 'Minimum' }
  ];

  constructor() {
    this.multi = this.getData();
    this.setColorScheme(defaultColor);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => this.multi = this.updateData());
  }
  setColorScheme(name: string) {
    this.colorScheme = colorSets.find(s => s.name === name);
  }
  calculateReferences(): Array<{ name: string, value: number }> {
    return [
      { value: this.maxReference, name: 'Maximum' },
      { value: this.minReference, name: 'Minimum' }
    ]
  }

  updateData(): MultiSeries {
    const currentDate = new Date(this.seed,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 30),
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 10))
    // const updated = [...this.multi];
    for (const series of this.multi) {
      const entry = {
        name: currentDate,
        value: Math.floor(Math.random() * 100000)
      }
      series.series.shift();
      series.series = [...series.series, entry]
    }
    this.seed += 1;
    return [...this.multi];
  }
  getData(): MultiSeries {
    const first = new Date(2011, 10, 30, 1, 10, 10);
    const second = new Date(2012, 10, 30, 1, 10, 10);
    const third = new Date(2013, 10, 30, 1, 10, 10);
    return [
      {
        name: 'Machine A',
        series: [
          {
            name: first,
            value: 40632,
            extra: {
              code: 'de'
            }
          },
          {
            name: second,
            value: 36953,
            extra: {
              code: 'de'
            }
          },
          {
            name: third,
            value: 31476,
            extra: {
              code: 'de'
            }
          }
        ]
      },
      {
        name: 'Machine B',
        series: [
          {
            name: first,
            value: 0,
            extra: {
              code: 'us'
            }
          },
          {
            name: second,
            value: 45986,
            extra: {
              code: 'us'
            }
          },
          {
            name: third,
            value: 37060,
            extra: {
              code: 'us'
            }
          }
        ]
      },
      {
        name: 'Machine C',
        series: [
          {
            name: first,
            value: 36745,
            extra: {
              code: 'fr'
            }
          },
          {
            name: second,
            value: 34774,
            extra: {
              code: 'fr'
            }
          },
          {
            name: third,
            value: 29476,
            extra: {
              code: 'fr'
            }
          }
        ]
      }
    ];
  }
}
