import { CityService } from './../../../services/city.service';
import { City } from './../../../models/city';
import { OperationClaim } from './../../../models/operationClaim';
import { UserOperationClaim } from './../../../models/userOperationClaim';
import { UserOperationClaimService } from './../../../services/user-operation-claim.service';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DrivingInformation } from 'src/app/models/drivingInformation';
import { IdentityInformation } from 'src/app/models/identityInformation';
import { PhoneNumber } from 'src/app/models/phoneNumber';
import { DrivingInformationService } from 'src/app/services/driving-information.service';
import { IdentityInformationService } from 'src/app/services/identity-information.service';
import { PhoneNumberService } from 'src/app/services/phone-number.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private identityInformationService: IdentityInformationService,
    private drivingInformationService: DrivingInformationService,
    private phoneNumberService: PhoneNumberService,
    private userOperationClaimService: UserOperationClaimService
  ) {}

  operationClaim: OperationClaim;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['userId']) {
        this.userService.detailUser(params['userId']).subscribe((response) => {
          if (response.data) {
            this.createUserDetail(parseInt(params['userId']));
          } else {
            this.toastrService.error('Böyle Bir Kullanıcı Bulunamadı.', 'Hata');
          }
        });
      } else if (this.getRole()) {
        this.createUserDetail(this.authService.getCurrentUserId);
      }
    });
    this.getCities();
  }

  role: string;
  dataLoaded = false;
  createUserDetail(userId: number) {
    this.userService.getByUserClaim(userId).subscribe((response) => {
      this.role = response.data.claimName;

      this.userService.getByUserId(userId).subscribe((response) => {
        this.user = response.data;
        if (this.role == 'Müşteri') {
          this.getIdentityInformation(userId);
          this.createIdentityInformationForm(userId);

          this.getDrivingInformation(userId);
          this.createDrivingInformationForm(userId);

          this.getPhoneNumbers(userId);
          this.createPhoneNumberForm(userId);
          this.dataLoaded = true;
        }
      });
      //this.user = response.data;
    });
  }

  getByUserClaim(userId: number): any {
    this.userService.getByUserClaim(userId).subscribe((response) => {
      this.operationClaim = response.data;
      return this.operationClaim.claimName;
    });
  }

  getRole() {
    return this.authService.getRole();
  }

  genders = [{ gender: 'Erkek' }, { gender: 'Kadın' }, { gender: 'Diğer' }];
  maritalStatuses = [
    { maritalStatus: 'Evli' },
    { maritalStatus: 'Bekar' },
    { maritalStatus: 'Diğer' },
  ];

  birthYears = [1960];
  birthYearsCreate() {
    for (let i = 1961; i <= 2005; i++) {
      this.birthYears.push(i);
    }
  }

  bloodGroups = [
    { bloodGroup: 'A Rh+' },
    { bloodGroup: 'A Rh-' },
    { bloodGroup: 'B Rh+' },
    { bloodGroup: 'B Rh-' },
    { bloodGroup: 'AB Rh+' },
    { bloodGroup: 'AB Rh-' },
    { bloodGroup: '0 Rh+' },
    { bloodGroup: '0 Rh-' },
  ];

  cities: City[] = [];

  getCities() {
    this.cityService.getCities().subscribe((response) => {
      this.cities = response.data;
    });
  }

  //Identity Information
  identityInformation: IdentityInformation;
  getIdentityInformation(userId: number) {
    this.identityInformationService
      .getByUserId(userId)
      .subscribe((response) => {
        this.identityInformation = response.data;
        if (response.data) {
          this.updateIdentityInformationForm();
        }
      });
  }

  identityInformationForm: FormGroup;
  createIdentityInformationForm(userId: number) {
    this.identityInformationForm = this.formBuilder.group({
      userId: [userId, Validators.required],
      serialNumber: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      birthPlace: ['', Validators.required],
      birthYear: [this.user.birthYear, Validators.required],
      maritalStatus: ['', Validators.required],
      gender: ['', Validators.required],
      validUntil: ['', Validators.required],
    });
  }

  updateIdentityInformationForm() {
    this.identityInformationForm = this.formBuilder.group({
      identityId: [this.identityInformation.identityId, Validators.required],
      userId: [this.identityInformation.userId, Validators.required],
      serialNumber: [
        this.identityInformation.serialNumber,
        Validators.required,
      ],
      fatherName: [this.identityInformation.fatherName, Validators.required],
      motherName: [this.identityInformation.motherName, Validators.required],
      birthPlace: [this.identityInformation.birthPlace, Validators.required],
      birthYear: [this.user.birthYear, Validators.required],
      maritalStatus: [
        this.identityInformation.maritalStatus,
        Validators.required,
      ],
      gender: [this.identityInformation.gender, Validators.required],
      validUntil: [
        this.identityInformation.validUntil.toString().split('T')[0],
        Validators.required,
      ],
    });
  }

  updateIdentityInformation() {
    if (this.identityInformationForm.valid) {
      let identityInformationModel = Object.assign(
        {},
        this.identityInformationForm.value
      );
      if (this.identityInformation) {
        this.identityInformationService
          .updateIdentityInformation(identityInformationModel)
          .subscribe(
            (response) => {
              this.toastrService.success(response.message, 'Başarılı');
              setTimeout(this.pageRefresh, 2000);
            },
            (responseError) => {
              if (
                responseError.error.ValidationErrors &&
                responseError.error.ValidationErrors.length > 0
              ) {
                for (
                  let i = 0;
                  i < responseError.error.ValidationErrors.length;
                  i++
                ) {
                  this.toastrService.error(
                    responseError.error.ValidationErrors[i].ErrorMessage,
                    'Doğrulama Hatası'
                  );
                }
              } else {
                this.toastrService.error(responseError.error.message, 'Hata');
              }
            }
          );
      } else {
        this.identityInformationService
          .addIdentityInformation(identityInformationModel)
          .subscribe(
            (response) => {
              this.toastrService.success(response.message, 'Başarılı');
              setTimeout(this.pageRefresh, 2000);
            },
            (responseError) => {
              if (
                responseError.error.ValidationErrors &&
                responseError.error.ValidationErrors.length > 0
              ) {
                for (
                  let i = 0;
                  i < responseError.error.ValidationErrors.length;
                  i++
                ) {
                  this.toastrService.error(
                    responseError.error.ValidationErrors[i].ErrorMessage,
                    'Doğrulama Hatası'
                  );
                }
              } else {
                this.toastrService.error(responseError.error.message, 'Hata');
              }
            }
          );
      }
    } else {
      this.toastrService.error('Form Tamamlanmadı', 'Hata');
    }
  }

  deleteIdentityInformation() {
    if (this.identityInformation) {
      this.identityInformationService
        .deleteIdentityInformation(this.identityInformation)
        .subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(this.pageRefresh, 2000);
          },
          (responseError) => {
            if (
              responseError.error.ValidationErrors &&
              responseError.error.ValidationErrors.length > 0
            ) {
              for (
                let i = 0;
                i < responseError.error.ValidationErrors.length;
                i++
              ) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            } else {
              this.toastrService.error(responseError.error.message, 'Hata');
            }
          }
        );
    } else {
      this.toastrService.error('Silinecek Bilgi Yok', 'Hata');
    }
  }

  //Driving Information
  drivingInformation: DrivingInformation;
  getDrivingInformation(userId: number) {
    this.drivingInformationService.getByUserId(userId).subscribe((response) => {
      this.drivingInformation = response.data;
      if (response.data) {
        this.updateDrivingInformationForm();
      }
    });
  }

  drivingInformationForm: FormGroup;
  createDrivingInformationForm(userId: number) {
    this.drivingInformationForm = this.formBuilder.group({
      userId: [userId, Validators.required],
      licenceProvince: ['', Validators.required],
      licenceNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      bloodGroup: ['', Validators.required],
    });
  }

  updateDrivingInformationForm() {
    this.drivingInformationForm = this.formBuilder.group({
      drivingId: [this.drivingInformation.drivingId, Validators.required],
      userId: [this.drivingInformation.userId, Validators.required],
      licenceProvince: [
        this.drivingInformation.licenceProvince,
        Validators.required,
      ],
      licenceNumber: [
        this.drivingInformation.licenceNumber,
        Validators.required,
      ],
      expiryDate: [
        this.drivingInformation.expiryDate.toString().split('T')[0],
        Validators.required,
      ],
      bloodGroup: [this.drivingInformation.bloodGroup, Validators.required],
    });
  }

  updateDrivingInformation() {
    if (this.drivingInformationForm.valid) {
      let drivingInformationModel = Object.assign(
        {},
        this.drivingInformationForm.value
      );
      if (this.drivingInformation) {
        this.drivingInformationService
          .updateDrivingInformation(drivingInformationModel)
          .subscribe(
            (response) => {
              this.toastrService.success(response.message, 'Başarılı');
              setTimeout(this.pageRefresh, 2000);
            },
            (responseError) => {
              if (
                responseError.error.ValidationErrors &&
                responseError.error.ValidationErrors.length > 0
              ) {
                for (
                  let i = 0;
                  i < responseError.error.ValidationErrors.length;
                  i++
                ) {
                  this.toastrService.error(
                    responseError.error.ValidationErrors[i].ErrorMessage,
                    'Doğrulama Hatası'
                  );
                }
              } else {
                this.toastrService.error(responseError.error.message, 'Hata');
              }
            }
          );
      } else {
        this.drivingInformationService
          .addDrivingInformation(drivingInformationModel)
          .subscribe(
            (response) => {
              this.toastrService.success(response.message, 'Başarılı');
              setTimeout(this.pageRefresh, 2000);
            },
            (responseError) => {
              if (
                responseError.error.ValidationErrors &&
                responseError.error.ValidationErrors.length > 0
              ) {
                for (
                  let i = 0;
                  i < responseError.error.ValidationErrors.length;
                  i++
                ) {
                  this.toastrService.error(
                    responseError.error.ValidationErrors[i].ErrorMessage,
                    'Doğrulama Hatası'
                  );
                }
              } else {
                this.toastrService.error(responseError.error.message, 'Hata');
              }
            }
          );
      }
    } else {
      this.toastrService.error('Form Tamamlanmadı', 'Hata');
    }
  }

  deleteDrivingInformation() {
    if (this.drivingInformation) {
      this.drivingInformationService
        .deleteDrivingInformation(this.drivingInformation)
        .subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(this.pageRefresh, 2000);
          },
          (responseError) => {
            if (
              responseError.error.ValidationErrors &&
              responseError.error.ValidationErrors.length > 0
            ) {
              for (
                let i = 0;
                i < responseError.error.ValidationErrors.length;
                i++
              ) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            } else {
              this.toastrService.error(responseError.error.message, 'Hata');
            }
          }
        );
    } else {
      this.toastrService.error('Silinecek Bilgi Yok', 'Hata');
    }
  }

  //Phone Numbers
  phoneNumbers: PhoneNumber[] = [];
  getPhoneNumbers(userId: number) {
    this.phoneNumberService
      .getByUserPhoneNumbers(userId)
      .subscribe((response) => {
        this.phoneNumbers = response.data;
      });
  }

  phoneNumberForm: FormGroup;
  createPhoneNumberForm(userId: number) {
    this.phoneNumberForm = this.formBuilder.group({
      userId: [userId, Validators.required],
      phoneNo: ['', Validators.required],
    });
  }

  deletePhoneNumber(phoneNumber: PhoneNumber) {
    this.phoneNumberService.deletePhoneNumber(phoneNumber).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
        setTimeout(this.pageRefresh, 2000);
      },
      (responseError) => {
        if (
          responseError.error.ValidationErrors &&
          responseError.error.ValidationErrors.length > 0
        ) {
          for (
            let i = 0;
            i < responseError.error.ValidationErrors.length;
            i++
          ) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama Hatası'
            );
          }
        } else {
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      }
    );
  }

  addPhoneNumber() {
    if (this.phoneNumberForm.valid) {
      let phoneNumberForm = Object.assign({}, this.phoneNumberForm.value);
      this.phoneNumberService.addPhoneNumber(phoneNumberForm).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(this.pageRefresh, 2000);
        },
        (responseError) => {
          if (
            responseError.error.ValidationErrors &&
            responseError.error.ValidationErrors.length > 0
          ) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          } else {
            this.toastrService.error(responseError.error.message, 'Hata');
          }
        }
      );
    } else {
      this.toastrService.error('Form Tamamlanmadı', 'Hata');
    }
  }

  pageRefresh() {
    window.location.reload();
  }
}
