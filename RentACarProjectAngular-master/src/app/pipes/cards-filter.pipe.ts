import { CardDetailDto } from './../models/cardDetailDto';
import { Card } from './../models/card';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardsFilter',
})
export class CardsFilterPipe implements PipeTransform {
  transform(value: CardDetailDto[], cardFilter: string): CardDetailDto[] {
    cardFilter = cardFilter ? cardFilter.toLocaleLowerCase() : '';
    return cardFilter
      ? value.filter(
          (c: CardDetailDto) =>
            c.nationalityId.toLocaleLowerCase().indexOf(cardFilter) !== -1 ||
            c.fullName.toLocaleLowerCase().indexOf(cardFilter) !== -1 ||
            String(c.cardNo).toLocaleLowerCase().indexOf(cardFilter) !== -1 ||
            String(c.expiryDate).toLocaleLowerCase().indexOf(cardFilter) !== -1 ||
            String(c.cvv).toLocaleLowerCase().indexOf(cardFilter) !== -1
        )
      : value;
  }
}
