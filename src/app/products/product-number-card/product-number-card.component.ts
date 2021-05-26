import { Component, OnInit } from '@angular/core';
import { Color, colorSets } from '@swimlane/ngx-charts';
import { interval, Subscription } from 'rxjs';
import { defaultColor, hours } from '../config';

@Component({
  selector: 'cd-product-number-card',
  templateUrl: './product-number-card.component.html',
  styleUrls: ['./product-number-card.component.scss']
})
export class ProductNumberCardComponent implements OnInit {
  single: any[] = [];
  view: any[] = [700, 400];
  subscription!: Subscription;
  colorScheme?: Color;
  cardColor: string = '#FFFFFF';


  constructor() {
    hours.forEach((label) => this.single.push({ name: label, value: Math.floor(10000 + Math.random() * 50000) }))
    // this.updateData();
    this.setColorScheme(defaultColor);
  }
  ngOnInit(): void {
    this.subscription = interval(5000).subscribe(() => this.single = this.updateData());
  }
  setColorScheme(name: string) {
    this.colorScheme = colorSets.find(s => s.name === name);
  }
  onSelect(event: any) {
    console.log(event);
  }

  updateData() {

    const data: { name: string; value: number; }[] = [];
    hours
      .forEach((label) => data
        .push({ name: label, value: Math.floor(10000 + Math.random() * 50000) }));
    return data;
  }
}