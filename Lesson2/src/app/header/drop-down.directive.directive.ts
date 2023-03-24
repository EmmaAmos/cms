import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDownDirective]'
})
export class DropDownDirectiveDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOPen(){
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
