import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { of } from 'rxjs';
import { WrapperDirective } from '../wrapper.directive';

@Component({
  selector: 'cd-component-wrapper',
  templateUrl: './component-wrapper.component.html',
  styleUrls: ['./component-wrapper.component.scss'],
})
export class ComponentWrapperComponent implements OnInit, AfterViewInit {
  @Input() item?: any;
  @ViewChild(WrapperDirective, { static: false }) pageHost!: WrapperDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (this.item == undefined) {
      console.error('Item undefined');
      return
    }


  }
  ngAfterViewInit() {
    if (this.pageHost) {
      // The container already exists
      this.addComponent();
    };

    of(this.pageHost).subscribe(() => {
      // The container has been added to the DOM
      console.log(this.pageHost);
      this.addComponent();
    });
  }

  private addComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item);
    const viewContainerRef = this.pageHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
