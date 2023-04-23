import { Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appCustomColor]'
})
export class CustomColorDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'Cyan';
 }

}
