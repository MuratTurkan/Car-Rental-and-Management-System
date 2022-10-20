import { Gear } from './../models/gear';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gearsFilter',
})
export class GearsFilterPipe implements PipeTransform {
  transform(value: Gear[], gearFilter: string): Gear[] {
    gearFilter = gearFilter ? gearFilter.toLocaleLowerCase() : '';
    return gearFilter
      ? value.filter(
          (g: Gear) => g.gearName.toLocaleLowerCase().indexOf(gearFilter) !== -1
        )
      : value;
  }
}
