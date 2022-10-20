import { CarDetailDto } from './../../models/carDetailDto';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rentalFuelFilter'
})
export class RentalFuelFilterPipe implements PipeTransform {

  transform(value: CarDetailDto[], carFilter: string): CarDetailDto[] {
    carFilter = carFilter ? carFilter.toLocaleLowerCase() : '';
    return carFilter
      ? value.filter(
          (c: CarDetailDto) =>
            c.fuelName.toLocaleLowerCase().indexOf(carFilter) !== -1
        )
      : value;
  }

}
