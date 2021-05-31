import { Injectable } from '@angular/core';
import { MultiSeries, Series } from '@swimlane/ngx-charts';
import { interval, Subject, Subscription } from 'rxjs';
import { LightStatus, Status } from '../config';

@Injectable({
  providedIn: 'root'
})
export class FakerService {


  private newLightStatusSubject = new Subject<Series>();

  newLightStatus$ = this.newLightStatusSubject.asObservable();

  private ligthStatusSubscription = new Subscription();

  private seed: number = 2014;

  constructor() { }

  startFakeLightStatusStream() {
    this.ligthStatusSubscription =
      interval(1000).subscribe(() => this.generateFakeLightStatus());
  }
  stopFakeLightStatusGeneration() {
    this.ligthStatusSubscription.unsubscribe()
  }
  generateFakeLightStatus(): void {
    const currentDate = new Date(this.seed,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 30),
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 60))

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
    this.newLightStatusSubject.next(newEntry);
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
