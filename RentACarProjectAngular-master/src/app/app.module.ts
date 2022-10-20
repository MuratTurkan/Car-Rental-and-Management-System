import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { NaviComponent } from './components/navi/navi.component';
import { PhoneNumberDetailComponent } from './components/PhoneNumberComponents/phone-number-detail/phone-number-detail.component';
import { PhoneNumbersComponent } from './components/PhoneNumberComponents/phone-numbers/phone-numbers.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalDetailDetailComponent } from './components/RentalDetailComponents/rental-detail-detail/rental-detail-detail.component';
import { RentalDetailsComponent } from './components/RentalDetailComponents/rental-details/rental-details.component';
import { CustomersComponent } from './components/UserComponents/customers/customers.component';
import { UserDetailComponent } from './components/UserComponents/user-detail/user-detail.component';
import { UsersComponent } from './components/UserComponents/users/users.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BranchsFilterPipe } from './pipes/branchs-filter.pipe';
import { BrandsFilterPipe } from './pipes/brands-filter.pipe';
import { CarImagesFilterPipe } from './pipes/car-images-filter.pipe';
import { CardsFilterPipe } from './pipes/cards-filter.pipe';
import { CarsFilterPipe } from './pipes/cars-filter.pipe';
import { CaseTypesFilterPipe } from './pipes/case-types-filter.pipe';
import { ClassesFilterPipe } from './pipes/classes-filter.pipe';
import { ColorsFilterPipe } from './pipes/colors-filter.pipe';
import { DrivingInformationsFilterPipe } from './pipes/driving-informations-filter.pipe';
import { FuelsFilterPipe } from './pipes/fuels-filter.pipe';
import { GearsFilterPipe } from './pipes/gears-filter.pipe';
import { IdentityInformationsFilterPipe } from './pipes/identity-informations-filter.pipe';
import { PhoneNumbersFilterPipe } from './pipes/phone-numbers-filter.pipe';
import { RentalDetailsFilterPipe } from './pipes/rental-details-filter.pipe';
import { RentalBrandFilterPipe } from './pipes/rentalFilter/rental-brand-filter.pipe';
import { RentalCaseTypeFilterPipe } from './pipes/rentalFilter/rental-case-type-filter.pipe';
import { RentalClassFilterPipe } from './pipes/rentalFilter/rental-class-filter.pipe';
import { RentalColorFilterPipe } from './pipes/rentalFilter/rental-color-filter.pipe';
import { RentalFuelFilterPipe } from './pipes/rentalFilter/rental-fuel-filter.pipe';
import { RentalGearFilterPipe } from './pipes/rentalFilter/rental-gear-filter.pipe';
import { UsersFilterPipe } from './pipes/users-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    LoginComponent,
    //GetAllComponent
    AuthComponent,
    BranchsComponent,
    BrandsComponent,
    CarsComponent,
    CardsComponent,
    CarImagesComponent,
    CaseTypesComponent,
    ClassesComponent,
    ColorsComponent,
    CustomersComponent,
    DrivingInformationsComponent,
    FuelsComponent,
    GearsComponent,
    IdentityInformationsComponent,
    PhoneNumbersComponent,
    RentalDetailsComponent,
    UsersComponent,
    //DetailComponent
    CarDetailComponent,
    CardDetailComponent,
    CarImageDetailComponent,
    DrivingInformationDetailComponent,
    IdentityInformationDetailComponent,
    PhoneNumberDetailComponent,
    RentalDetailDetailComponent,
    UserDetailComponent,
    //Pipes
    BranchsFilterPipe,
    BrandsFilterPipe,
    CarsFilterPipe,
    CardsFilterPipe,
    CarImagesFilterPipe,
    CaseTypesFilterPipe,
    ClassesFilterPipe,
    ColorsFilterPipe,
    DrivingInformationsFilterPipe,
    FuelsFilterPipe,
    GearsFilterPipe,
    IdentityInformationsFilterPipe,
    PhoneNumbersFilterPipe,
    RentalDetailsFilterPipe,
    UsersFilterPipe,
    RegisterComponent,
    GetByUsableComponent,
    RentalGearFilterPipe,
    RentalColorFilterPipe,
    RentalBrandFilterPipe,
    RentalFuelFilterPipe,
    RentalClassFilterPipe,
    RentalCaseTypeFilterPipe,
    BranchDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
