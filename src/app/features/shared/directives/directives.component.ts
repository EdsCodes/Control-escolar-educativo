//DIrectiva de tamaño de texto 20px

import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[DirectiveTextSize]'
})
export class TextSizeDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '20px');
  }
}
