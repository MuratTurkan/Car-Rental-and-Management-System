import { CarImageDetailDto } from './../models/carImageDetailDto';
import { CarImage } from './../models/carImage';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carImagesFilter',
})
export class CarImagesFilterPipe implements PipeTransform {
  transform(
    value: CarImageDetailDto[],
    carImageFilter: string
  ): CarImageDetailDto[] {
    carImageFilter = carImageFilter ? carImageFilter.toLocaleLowerCase() : '';
    return carImageFilter
      ? value.filter(
          (c: CarImageDetailDto) =>
            c.carPlate.toLocaleLowerCase().indexOf(carImageFilter) !== -1 ||
            c.imagePath.toLocaleLowerCase().indexOf(carImageFilter) !== -1
        )
      : value;
  }
}
