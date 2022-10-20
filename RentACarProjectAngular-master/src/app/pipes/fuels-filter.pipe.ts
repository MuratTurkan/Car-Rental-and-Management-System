import { Fuel } from './../models/fuel';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fuelsFilter',
})
export class FuelsFilterPipe implements PipeTransform {
  transform(value: Fuel[], fuelFilter: string): Fuel[] {
    fuelFilter = fuelFilter ? fuelFilter.toLocaleLowerCase() : '';
    return fuelFilter
      ? value.filter(
          (f: Fuel) => f.fuelName.toLocaleLowerCase().indexOf(fuelFilter) !== -1
        )
      : value;
  }
}
