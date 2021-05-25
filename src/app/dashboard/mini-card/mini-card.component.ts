import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cd-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.scss']
})
export class MiniCardComponent implements OnInit {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() value!: string;
  @Input() color!: string;
  @Input() isIncrease!: boolean;
  @Input() isCurrency!: boolean;
  @Input() duration!: string;
  @Input() percentValue!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
