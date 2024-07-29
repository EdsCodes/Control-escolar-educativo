import { TextSizeDirective } from './TextSize.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('TextSizeDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const renderer = TestBed.inject(Renderer2);
    const directive = new TextSizeDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

