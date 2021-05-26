import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { colorSets, MultiSeries, Color } from '@swimlane/ngx-charts';
import { interval, Subscription } from 'rxjs';
import { defaultColor } from '../config';
enum Status {
  Up = "Up",
  Down = "Down",
  Stop = "Off",
}
@Component({
  selector: 'cd-light-status',
  templateUrl: './light-status.component.html',
  styleUrls: ['./light-status.component.scss']
})
export class LightStatusComponent implements OnInit {
  multi!: any[];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = false;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time (mins)';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Production';
  animations: boolean = true;
  seed = 2014;
  colorScheme = {
    domain: ['	#00FF00', '#FF0000', '#FFBF00', '#AAAAAA']
  };
  subscription!: Subscription;
  status = [Status.Up, Status.Stop, Status.Down];

  maxLength: number = 100;
  constructor() {
    this.multi = this.getData();

  }
  formatDate(date: string) {
    const monday = new Date(date);
    return monday.getSeconds();
  }
  ngOnInit(): void {
    this.subscription = interval(1500).subscribe(() => this.multi = this.updateData());
  }

  updateData(): MultiSeries {
    const currentDate = new Date(this.seed,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 30),
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 60))

    if (this.multi.length > this.maxLength)
      this.multi.shift()

    const newEntry = {
      name: currentDate.toLocaleString(),
      series: [
        {
          name: Status.Up,
          value: 0,
        },
        {
          name: Status.Stop,
          value: 0,
        },
        {
          name: Status.Down,
          value: 0,
        }
      ]
    }
    const index = Math.floor(Math.random() * 3);
    newEntry.series[index].value = 1;
    this.seed += 1;

    return [...this.multi, newEntry];
  }
  onSelect(event: any) {
    console.log(event);
  }
  getData(): MultiSeries {

    const first = new Date(2011, 10, 30, 1, 10, 10).toLocaleString();
    const second = new Date(2012, 10, 30, 1, 11, 10).toLocaleString();
    const third = new Date(2013, 10, 30, 1, 12, 10).toLocaleString();
    return [
      {
        "name": first,
        "series": [
          {
            "name": Status.Up,
            "value": 1
          },
          {
            "name": Status.Stop,
            "value": 0
          },
          {
            "name": Status.Down,
            "value": 0
          }
        ]
      },

      {
        "name": second,
        "series": [
          {
            "name": Status.Up,
            "value": 0
          },
          {
            "name": Status.Stop,
            "value": 1
          },
          {
            "name": Status.Down,
            "value": 0
          }
        ]
      },

      {
        "name": third,
        "series": [
          {
            "name": Status.Up,
            "value": 1
          },
          {
            "name": Status.Stop,
            "value": 0
          },
          {
            "name": Status.Down,
            "value": 0
          }
        ]
      }]
  }
}
