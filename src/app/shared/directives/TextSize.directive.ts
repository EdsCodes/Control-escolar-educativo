import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[TextSizeDirective]'
})
export class TextSizeDirective {
   constructor(private elementRef: ElementRef) {
      this.elementRef.nativeElement.style.fontSize = '20px';
   }
}