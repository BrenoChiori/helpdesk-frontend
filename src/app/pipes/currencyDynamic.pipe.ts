import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyDynamic',
  pure: false
})
export class CurrencyDynamicPipe implements PipeTransform {
  transform(value: string | number | null): string {
    if (value === null || value === undefined || value === '') {
      return 'R$0,00';
    }

    const numericValue = value.toString().replace(/\D/g, '');

    const integerValue = parseInt(numericValue, 10) || 0;

    const formattedValue = (integerValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formattedValue;
  }
}
