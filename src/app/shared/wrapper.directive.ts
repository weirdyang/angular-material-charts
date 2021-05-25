import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cdWrapper]'
})
export class WrapperDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
