import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from './../../models/carDetailDto';

@Pipe({
  name: 'rentalGearFilter',
})
export class RentalGearFilterPipe implements PipeTransform {
  transform(value: CarDetailDto[], carFilter: string): CarDetailDto[] {
    carFilter = carFilter ? carFilter.toLocaleLowerCase() : '';
    return carFilter
      ? value.filter(
          (c: CarDetailDto) =>
            c.gearName.toLocaleLowerCase().indexOf(carFilter) !== -1
        )
      : value;
  }
}
