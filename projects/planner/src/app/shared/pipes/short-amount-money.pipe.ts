import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortAmountOfMoney',
  standalone: true,
})
export class ShortAmountMoneyPipe implements PipeTransform {
  transform(value: string, currency: string = '€'): string {
    const number = Number(value);

    if (isNaN(number)) {
      return '';
    }

    if (value === null) {
      return '';
    }

    if (number === 0) {
      return '';
    }

    let abs = Math.abs(number);
    const rounder = Math.pow(10, 1);
    const isNegative = number < 0;
    let key = '';

    const powers = [
      { key: 'Q', value: Math.pow(10, 15) },
      { key: 'T', value: Math.pow(10, 12) },
      { key: 'B', value: Math.pow(10, 9) },
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'k', value: Math.pow(10, 3) },
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + currency + ' ' + abs + key;
  }
}
