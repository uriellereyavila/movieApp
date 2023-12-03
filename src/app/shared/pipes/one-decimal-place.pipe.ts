import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oneDecimalPlace'
})
export class OneDecimalPlacePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value.toFixed(1);
  }

}
