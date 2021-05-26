import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { WrapperDirective } from '../wrapper.directive';

@Component({
  selector: 'cd-component-wrapper',
  templateUrl: './component-wrapper.component.html',
  styleUrls: ['./component-wrapper.component.scss'],
})
export class ComponentWrapperComponent implements OnInit {
  @Input() item?: any;
  @ViewChild(WrapperDirective, { static: true }) pageHost!: WrapperDirective;
  subscription: Subscription = new Subscription;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterContentInit(): void {
    this.addComponent();
  }

  ngOnInit() {
    if (this.item == undefined) {
      console.error('Item undefined');
      return
    }
  }

  private addComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item);
    const viewContainerRef = this.pageHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
