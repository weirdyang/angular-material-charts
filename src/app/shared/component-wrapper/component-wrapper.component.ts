import { AfterContentChecked, AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { WrapperDirective } from '../wrapper.directive';

@Component({
  selector: 'cd-component-wrapper',
  templateUrl: './component-wrapper.component.html',
  styleUrls: ['./component-wrapper.component.scss'],
})
export class ComponentWrapperComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Input() item?: any;
  @ViewChild(WrapperDirective, { static: false }) pageHost!: WrapperDirective;
  subscription: Subscription = new Subscription;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
  ngAfterContentChecked(): void {

  }

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
    } else {
      this.subscription = of(this.pageHost).subscribe(
        {
          next: () => this.addComponent(),
          error: console.error,
          complete: () => console.log('completed loading')
        });
    }
  }

  private addComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item);
    const viewContainerRef = this.pageHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
