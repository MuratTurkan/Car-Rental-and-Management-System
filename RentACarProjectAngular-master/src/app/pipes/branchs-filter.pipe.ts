import { BranchDetailDto } from 'src/app/models/branchDetailDto';
import { CityService } from './../services/city.service';
import { City } from './../models/city';
import { Branch } from './../models/branch';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'branchsFilter',
})
export class BranchsFilterPipe implements PipeTransform {
  transform(value: BranchDetailDto[], branchFilter: string): BranchDetailDto[] {
    branchFilter = branchFilter ? branchFilter.toLocaleLowerCase() : '';
    return branchFilter
      ? value.filter(
          (b: BranchDetailDto) =>
            b.branchName.toLocaleLowerCase().indexOf(branchFilter) !== -1 ||
            b.cityName.toLocaleLowerCase().indexOf(branchFilter) !== -1
        )
      : value;
  }
}
