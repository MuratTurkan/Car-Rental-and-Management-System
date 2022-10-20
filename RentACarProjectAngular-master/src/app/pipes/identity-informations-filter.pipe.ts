import { IdentityInformation } from './../models/identityInformation';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'identityInformationsFilter',
})
export class IdentityInformationsFilterPipe implements PipeTransform {
  transform(value: IdentityInformation[], identityInformationFilter: string): IdentityInformation[] {
    identityInformationFilter = identityInformationFilter ? identityInformationFilter.toLocaleLowerCase() : '';
    return identityInformationFilter
      ? value.filter(
          (i: IdentityInformation) =>
            i.serialNumber.toLocaleLowerCase().indexOf(identityInformationFilter) !== -1 ||
            i.fatherName.toLocaleLowerCase().indexOf(identityInformationFilter) !== -1 ||
            i.motherName.toLocaleLowerCase().indexOf(identityInformationFilter) !== -1 ||
            i.birthPlace.toLocaleLowerCase().indexOf(identityInformationFilter) !== -1 ||
            String(i.birthYear).toLocaleLowerCase().indexOf(identityInformationFilter) !== -1 ||
            i.maritalStatus.toLocaleLowerCase().indexOf(identityInformationFilter) !== -1 ||
            i.gender.toLocaleLowerCase().indexOf(identityInformationFilter) !== -1 ||
            String(i.validUntil).toLocaleLowerCase().indexOf(identityInformationFilter) !== -1
        )
      : value;
  }
}
