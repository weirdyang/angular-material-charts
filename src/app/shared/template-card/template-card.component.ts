import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cd-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss'],
})
export class TemplateCardComponent implements OnInit {
  @Input() title!: string;
  @Input() component: any;
  constructor() { }

  ngOnInit(): void {
  }
}
