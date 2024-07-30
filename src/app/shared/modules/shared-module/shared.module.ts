import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSizeDirective } from '../../directives/TextSize.directive';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [TextSizeDirective],
  exports: [TextSizeDirective],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
