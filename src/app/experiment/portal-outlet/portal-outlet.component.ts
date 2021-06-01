import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cd-portal-outlet',
  templateUrl: './portal-outlet.component.html',
  styleUrls: ['./portal-outlet.component.scss']
})
export class PortalOutletComponent implements OnInit, AfterViewInit {

  portal: any

  @Input() item?: any

  constructor() { }

  ngAfterViewInit(): void {
    this.portal = new ComponentPortal(this.item);
  }

  ngOnInit(): void {
  }

}
