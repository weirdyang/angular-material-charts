import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { WrapperDirective } from '../wrapper.directive';

@Component({
  selector: 'cd-component-wrapper',
  templateUrl: './component-wrapper.component.html',
  styleUrls: ['./component-wrapper.component.scss'],
})
export class ComponentWrapperComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() item?: any;
  @ViewChild(WrapperDirective, { static: true }) pageHost!: WrapperDirective;
  subscription: Subscription = new Subscription;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngAfterContentInit(): void {
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

  ngOnInit() {
    if (this.item == undefined) {
      console.error('Item undefined');
      return
    }
  }
  ngAfterViewInit() {

  }

  private addComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item);
    const viewContainerRef = this.pageHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
