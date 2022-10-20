import { Color } from './../models/color';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorsFilter',
})
export class ColorsFilterPipe implements PipeTransform {
  transform(value: Color[], colorFilter: string): Color[] {
    colorFilter = colorFilter ? colorFilter.toLocaleLowerCase() : '';
    return colorFilter
      ? value.filter(
          (c: Color) =>
            c.colorName.toLocaleLowerCase().indexOf(colorFilter) !== -1
        )
      : value;
  }
}
