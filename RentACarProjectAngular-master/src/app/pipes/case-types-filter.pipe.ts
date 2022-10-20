import { Pipe, PipeTransform } from '@angular/core';
import { CaseType } from './../models/caseType';

@Pipe({
  name: 'caseTypesFilter',
})
export class CaseTypesFilterPipe implements PipeTransform {
  transform(value: CaseType[], caseTypeFilter: string): CaseType[] {
    caseTypeFilter = caseTypeFilter ? caseTypeFilter.toLocaleLowerCase() : '';
    return caseTypeFilter
      ? value.filter(
          (c: CaseType) =>
            c.caseName.toLocaleLowerCase().indexOf(caseTypeFilter) !== -1
        )
      : value;
  }
}
