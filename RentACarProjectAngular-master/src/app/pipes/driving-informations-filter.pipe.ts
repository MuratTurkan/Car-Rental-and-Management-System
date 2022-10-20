import { DrivingInformation } from './../models/drivingInformation';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'drivingInformationsFilter',
})
export class DrivingInformationsFilterPipe implements PipeTransform {
  transform(value: DrivingInformation[], drivingInformationFilter: string): DrivingInformation[] {
    drivingInformationFilter = drivingInformationFilter ? drivingInformationFilter.toLocaleLowerCase() : '';
    return drivingInformationFilter
      ? value.filter(
          (d: DrivingInformation) =>
            d.licenceNumber.toLocaleLowerCase().indexOf(drivingInformationFilter) !== -1 ||
            String(d.expiryDate).toLocaleLowerCase().indexOf(drivingInformationFilter) !== -1 ||
            d.licenceProvince.toLocaleLowerCase().indexOf(drivingInformationFilter) !== -1 ||
            d.bloodGroup.toLocaleLowerCase().indexOf(drivingInformationFilter) !== -1
        )
      : value;
  }
}
