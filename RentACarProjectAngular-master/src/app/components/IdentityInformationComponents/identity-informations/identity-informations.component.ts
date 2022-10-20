import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city';
import { IdentityInformation } from 'src/app/models/identityInformation';
import { CityService } from 'src/app/services/city.service';
import { IdentityInformationService } from 'src/app/services/identity-information.service';

@Component({
  selector: 'app-identity-informations',
  templateUrl: './identity-informations.component.html',
  styleUrls: ['./identity-informations.component.css'],
})
export class IdentityInformationsComponent implements OnInit {
  identityInformations: IdentityInformation[] = [];
  identityInformationAddForm: FormGroup;

  genders = [{ gender: 'Erkek' }, { gender: 'Kadın' }, { gender: 'Diğer' }];
  maritalStatuses = [
    { maritalStatus: 'Evli' },
    { maritalStatus: 'Bekar' },
    { maritalStatus: 'Diğer' },
  ];

  cities: City[] = [];

  birthYears = [1960];
  birthYearsCreate() {
    for (let i = 1961; i <= 2005; i++) {
      this.birthYears.push(i);
    }
  }

  identityInformationUpdateAndDeleteForm: FormGroup;
  identityInformation: IdentityInformation = {
    identityId: 0,
    userId:0,
    serialNumber: '',
    fatherName: '',
    motherName: '',
    birthPlace: '',
    birthYear: 0,
    maritalStatus: '',
    gender: '',
    validUntil: undefined,
  };

  identityInformationFilter = '';

  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private identityInformationService: IdentityInformationService,
    private cityService: CityService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getIdentityInformations();
    this.birthYearsCreate();
    this.getCities();
    this.createIdentityInformationAddForm();
    this.createIdentityInformationUpdateAndDeleteForm();
  }

  getCities() {
    this.cityService.getCities().subscribe((response) => {
      this.cities = response.data;
    });
  }

  getIdentityInformations() {
    this.identityInformationService
      .getIdentityInformations()
      .subscribe((response) => {
        this.identityInformations = response.data;
        this.dataLoaded = true;
      });
  }

  createIdentityInformationDetail(identityInformation: IdentityInformation) {
    this.identityInformationService
      .detailIdentityInformation(identityInformation.identityId)
      .subscribe((response) => {
        this.identityInformation = response.data;
        this.createIdentityInformationUpdateAndDeleteForm();
      });
  }

  createIdentityInformationUpdateAndDeleteForm() {
    this.identityInformationUpdateAndDeleteForm = this.formBuilder.group({
      identityId: [this.identityInformation.identityId, Validators.required],
      serialNumber: [
        this.identityInformation.serialNumber,
        Validators.required,
      ],
      fatherName: [this.identityInformation.fatherName, Validators.required],
      motherName: [this.identityInformation.motherName, Validators.required],
      birthPlace: [this.identityInformation.birthPlace, Validators.required],
      birthYear: [this.identityInformation.birthYear, Validators.required],
      maritalStatus: [
        this.identityInformation.maritalStatus,
        Validators.required,
      ],
      gender: [this.identityInformation.gender, Validators.required],
      validUntil: [this.identityInformation.validUntil, Validators.required],
    });
  }

  createIdentityInformationAddForm() {
    this.identityInformationAddForm = this.formBuilder.group({
      serialNumber: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      birthPlace: ['', Validators.required],
      birthYear: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      gender: ['', Validators.required],
      validUntil: ['', Validators.required],
    });
  }

  add() {
    if (this.identityInformationAddForm.valid) {
      let identityInformationModel = Object.assign(
        {},
        this.identityInformationAddForm.value
      );
      this.identityInformationService
        .addIdentityInformation(identityInformationModel)
        .subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(this.pageRefresh,2000);
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
      this.toastrService.error('Form Tamamlanmadı','Hata');
    }
  }

  delete() {
    if (this.identityInformationUpdateAndDeleteForm.valid) {
      let identityInformationModel = Object.assign(
        {},
        this.identityInformationUpdateAndDeleteForm.value
      );
      this.identityInformationService
        .deleteIdentityInformation(identityInformationModel)
        .subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(this.pageRefresh,2000);
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
      this.toastrService.error('Form Tamamlanmadı','Hata');
    }
  }

  update() {
    if (this.identityInformationUpdateAndDeleteForm.valid) {
      let identityInformationModel = Object.assign(
        {},
        this.identityInformationUpdateAndDeleteForm.value
      );
      this.identityInformationService
        .updateIdentityInformation(identityInformationModel)
        .subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(this.pageRefresh,2000);
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
      this.toastrService.error('Form Tamamlanmadı','Hata');
    }
  }

  pageRefresh(){
    window.location.reload()
  }
}
