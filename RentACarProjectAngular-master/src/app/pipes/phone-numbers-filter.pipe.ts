import { PhoneNumberDetailDto } from './../models/phoneNumberDetailDto';
import { PhoneNumber } from './../models/phoneNumber';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumbersFilter',
})
export class PhoneNumbersFilterPipe implements PipeTransform {
  transform(value: PhoneNumberDetailDto[], phoneNumberFilter: string): PhoneNumberDetailDto[] {
    phoneNumberFilter = phoneNumberFilter ? phoneNumberFilter.toLocaleLowerCase() : '';
    return phoneNumberFilter
      ? value.filter(
          (p: PhoneNumberDetailDto) =>
            p.nationalityId.toLocaleLowerCase().indexOf(phoneNumberFilter)!==-1 ||
            p.phoneNo.toLocaleLowerCase().indexOf(phoneNumberFilter) !== -1
        )
      : value;
  }
}
