import { CarDetailDto } from './../../models/carDetailDto';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rentalBrandFilter'
})
export class RentalBrandFilterPipe implements PipeTransform {

  transform(value: CarDetailDto[], carFilter: string): CarDetailDto[] {
    carFilter = carFilter ? carFilter.toLocaleLowerCase() : '';
    return carFilter
      ? value.filter(
          (c: CarDetailDto) =>
            c.brandName.toLocaleLowerCase().indexOf(carFilter) !== -1
        )
      : value;
  }

}
