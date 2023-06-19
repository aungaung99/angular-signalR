import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUi]'
})
export class UiDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
