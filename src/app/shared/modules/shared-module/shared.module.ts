import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSizeDirective } from '../../directives/TextSize.directive';

@NgModule({
  declarations: [TextSizeDirective],
  exports: [TextSizeDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
