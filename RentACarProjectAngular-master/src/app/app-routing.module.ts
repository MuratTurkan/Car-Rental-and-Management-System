import { EmployeeGuard } from './guards/employee.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthComponent } from './components/AuthComponents/auth/auth.component';
import { BranchDetailComponent } from './components/BranchComponents/branch-detail/branch-detail.component';
import { BranchsComponent } from './components/BranchComponents/branchs/branchs.component';
import { BrandsComponent } from './components/BrandComponents/brands/brands.component';
import { CarDetailComponent } from './components/CarComponents/car-detail/car-detail.component';
import { CarImagesComponent } from './components/CarComponents/car-images/car-images.component';
import { CarsComponent } from './components/CarComponents/cars/cars.component';
import { GetByUsableComponent } from './components/CarComponents/get-by-usable/get-by-usable.component';
import { CardDetailComponent } from './components/CardComponents/card-detail/card-detail.component';
import { CardsComponent } from './components/CardComponents/cards/cards.component';
import { CarImageDetailComponent } from './components/CarImageComponents/car-image-detail/car-image-detail.component';
import { CaseTypesComponent } from './components/CaseTypeComponents/case-types/case-types.component';
import { ClassesComponent } from './components/ClassComponents/classes/classes.component';
import { ColorsComponent } from './components/ColorComponents/colors/colors.component';
import { DrivingInformationDetailComponent } from './components/DrivingInformationComponents/driving-information-detail/driving-information-detail.component';
import { DrivingInformationsComponent } from './components/DrivingInformationComponents/driving-informations/driving-informations.component';
import { FuelsComponent } from './components/FuelComponents/fuels/fuels.component';
import { GearsComponent } from './components/GearComponents/gears/gears.component';
import { IdentityInformationDetailComponent } from './components/IdentityInformationComponents/identity-information-detail/identity-information-detail.component';
import { IdentityInformationsComponent } from './components/IdentityInformationComponents/identity-informations/identity-informations.component';
import { LoginComponent } from './components/login/login.component';
import { PhoneNumberDetailComponent } from './components/PhoneNumberComponents/phone-number-detail/phone-number-detail.component';
import { PhoneNumbersComponent } from './components/PhoneNumberComponents/phone-numbers/phone-numbers.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalDetailDetailComponent } from './components/RentalDetailComponents/rental-detail-detail/rental-detail-detail.component';
import { RentalDetailsComponent } from './components/RentalDetailComponents/rental-details/rental-details.component';
import { CustomersComponent } from './components/UserComponents/customers/customers.component';
import { UserDetailComponent } from './components/UserComponents/user-detail/user-detail.component';
import { UsersComponent } from './components/UserComponents/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: GetByUsableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'deneme', component: GetByUsableComponent },

  //GETALL COMPONENT PATH
  { path: 'auths', component: AuthComponent ,canActivate:[AdminGuard?true:false] },
  { path: 'branchs', component: BranchsComponent},
  { path: 'brands', component: BrandsComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'carImages/:carId', component: CarImagesComponent },
  { path: 'caseTypes', component: CaseTypesComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'colors', component: ColorsComponent },
  { path: 'drivingInformations', component: DrivingInformationsComponent },
  { path: 'fuels', component: FuelsComponent },
  { path: 'gears', component: GearsComponent },
  { path: 'identityInformations', component: IdentityInformationsComponent },
  { path: 'phoneNumbers', component: PhoneNumbersComponent },
  { path: 'rentalDetails', component: RentalDetailsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'customers', component: CustomersComponent },


  //DETAIL COMPONENT PATH
  { path: 'car/detail/:carId', component: CarDetailComponent },
  { path: 'branch/detail/:branchId', component: BranchDetailComponent },
  { path: 'card/detail', component: CardDetailComponent },
  { path: 'carImage/detail', component: CarImageDetailComponent },
  {
    path: 'drivingInformation/detail',
    component: DrivingInformationDetailComponent,
  },
  {
    path: 'identityInformation/detail',
    component: IdentityInformationDetailComponent,
  },
  { path: 'phoneNumber/detail', component: PhoneNumberDetailComponent },
  { path: 'rentalDetail/detail', component: RentalDetailDetailComponent },
  { path: 'user/detail/:userId', component: UserDetailComponent },
  { path: 'my_account', component: UserDetailComponent },
];
const deneme=[{ path: '', component: UserDetailComponent }]

let authService: AuthService;
let role="Yönetici"
@NgModule({
  imports: [
    RouterModule.forRoot(
        role == 'Yönetici'
        ? routes
        : role == 'Çalışan'
        ? routes
        : role == 'Müşteri'
        ? routes
        :deneme
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
