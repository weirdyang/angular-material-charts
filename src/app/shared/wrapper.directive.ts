import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cdWrapperDirective]'
})
export class WrapperDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
