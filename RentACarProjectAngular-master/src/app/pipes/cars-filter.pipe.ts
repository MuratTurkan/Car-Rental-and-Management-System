import { CarDetailDto } from './../models/carDetailDto';
import { Car } from './../models/car';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carsFilter',
})
export class CarsFilterPipe implements PipeTransform {
  transform(value: CarDetailDto[], carFilter: string): CarDetailDto[] {
    carFilter = carFilter ? carFilter.toLocaleLowerCase() : '';
    return carFilter
      ? value.filter(
          (c: CarDetailDto) =>
          c.brandName.toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          c.colorName.toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          c.branchName.toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          c.gearName.toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          c.fuelName.toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          c.className.toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          c.caseName.toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          c.carPlate.toLocaleLowerCase().indexOf(carFilter) !== -1 ||
          String(c.carStar).toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          String(c.modelYear).toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          String(c.dailyPrice).toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          c.description.toLocaleLowerCase().indexOf(carFilter) !== -1  ||
          String(c.carUsable).toLocaleLowerCase().indexOf(carFilter) !== -1 
        )
      : value;
  }
}
