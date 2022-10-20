import { Brand } from './../models/brand';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brandsFilter',
})
export class BrandsFilterPipe implements PipeTransform {
  transform(value: Brand[], brandFilter: string): Brand[] {
    brandFilter = brandFilter ? brandFilter.toLocaleLowerCase() : '';
    return brandFilter
      ? value.filter(
          (b: Brand) =>
            b.brandName.toLocaleLowerCase().indexOf(brandFilter) !== -1
        )
      : value;
  }
}
