import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value){
      return '';
    }
    return `${value.nombre} ${value.apellidos}`;
  }
}
