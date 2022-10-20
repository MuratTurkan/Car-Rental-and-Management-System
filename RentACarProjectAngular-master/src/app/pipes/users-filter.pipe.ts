import { UserDetailDto } from './../models/userDetailDto';
import { User } from './../models/user';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersFilter',
})
export class UsersFilterPipe implements PipeTransform {
  transform(value: UserDetailDto[], userFilter: string): UserDetailDto[] {
    userFilter = userFilter ? userFilter.toLocaleLowerCase() : '';
    return userFilter
      ? value.filter(
          (u: UserDetailDto) =>
            u.firstName.toLocaleLowerCase().indexOf(userFilter) !== -1 ||
            u.lastName.toLocaleLowerCase().indexOf(userFilter) !== -1 ||
            u.nationalityId.toLocaleLowerCase().indexOf(userFilter) !== -1 ||
            String(u.birthYear).toLocaleLowerCase().indexOf(userFilter) !== -1 ||
            u.email.toLocaleLowerCase().indexOf(userFilter) !== -1 ||
            String(u.status).toLocaleLowerCase().indexOf(userFilter) !== -1 ||
            u.claimName.toLocaleLowerCase().indexOf(userFilter) !== -1
        )
      : value;
  }
}
