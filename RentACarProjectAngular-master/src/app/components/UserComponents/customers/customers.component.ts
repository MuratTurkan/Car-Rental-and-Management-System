import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdentityInformation } from 'src/app/models/identityInformation';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { IdentityInformationService } from 'src/app/services/identity-information.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  userDetailDtos: UserDetailDto[] = [];
  userAddForm: FormGroup;

  userUpdateAndDeleteForm: FormGroup;
  user: User = {
    userId: 0,
    firstName: '',
    lastName: '',
    nationalityId: '',
    birthYear: 0,
    email: '',
    status: '',
  };

  statuses = ['Aktif', 'Pasif'];

  birthYears = [1960];
  birthYearsCreate() {
    for (let i = 1961; i <= 2005; i++) {
      this.birthYears.push(i);
    }
  }

  userOperationClaims: UserOperationClaim[] = [];
  operationClaims: OperationClaim[] = [];

  userFilter = '';

  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private identityInformationService: IdentityInformationService,
    private operationClaimService: OperationClaimService,
    private userOperationClaimService: UserOperationClaimService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserDetailDtos();
    this.getUserOperationClaims();
    this.birthYearsCreate();
    this.getOperationClaims();
    this.createUserAddForm();
    this.createUserUpdateAndDeleteForm();
  }

  getUserDetailDtos() {
    this.userService.getByCustomers().subscribe((response) => {
      this.userDetailDtos = response.data;
      this.dataLoaded = true;
    });
  }

  getUserOperationClaims() {
    this.userOperationClaimService
      .getUserOperationClaims()
      .subscribe((response) => {
        this.userOperationClaims = response.data;
      });
  }

  getOperationClaims() {
    this.operationClaimService.getOperationClaims().subscribe((response) => {
      this.operationClaims = response.data;
    });
  }

  getClaimName(userId: number) {
    if (
      this.operationClaims.find(
        (o) =>
          o.claimId ==
          this.userOperationClaims.find((o) => o.userId == userId).claimId
      ).claimName === 'admin'
    ) {
      return 'Yönetici';
    }
    if (
      this.operationClaims.find(
        (o) =>
          o.claimId ==
          this.userOperationClaims.find((o) => o.userId == userId).claimId
      ).claimName === 'employee'
    ) {
      return 'Çalışan';
    }
    if (
      this.operationClaims.find(
        (o) =>
          o.claimId ==
          this.userOperationClaims.find((o) => o.userId == userId).claimId
      ).claimName === 'customer'
    ) {
      return 'Müşteri';
    }
    return 'deneme';
  }

  createUserDetail(userId: number) {
    this.userService.detailUser(userId).subscribe((response) => {
      this.user = response.data;
      this.createUserUpdateAndDeleteForm();
    });
  }

  createUserUpdateAndDeleteForm() {
    this.userUpdateAndDeleteForm = this.formBuilder.group({
      userId: [this.user.userId, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      nationalityId: [this.user.nationalityId, Validators.required],
      birthYear: [this.user.birthYear, Validators.required],
      email: [this.user.email, Validators.required],
      status: [this.user.status, Validators.required],
    });
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationalityId: ['', Validators.required],
      birthYear: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required],
    });
  }  

  currentIdentityInformation:IdentityInformation
  getCurrentIdentityInformation(userId:number) {
    this.identityInformationService.getByUserId(userId).subscribe((response) => {
      this.currentIdentityInformation = response.data;
      this.createIdentityInformationForm(userId);
    });
    this.createIdentityInformationForm(userId);
  }

  identityInformationForm:FormGroup
  createIdentityInformationForm(userId:number) {
    if(this.currentIdentityInformation){
      this.identityInformationForm = this.formBuilder.group({
        identityId: [this.currentIdentityInformation?.identityId, Validators.required],
        userId: [this.currentIdentityInformation?.userId, Validators.required],
        serialNumber: [this.currentIdentityInformation?.serialNumber, Validators.required],
        fatherName: [this.currentIdentityInformation?.fatherName, Validators.required],
        motherName: [this.currentIdentityInformation?.motherName, Validators.required],
        birthPlace: [this.currentIdentityInformation?.birthPlace, Validators.required],
        birthYear: [this.currentIdentityInformation?.birthYear, Validators.required],
        maritalStatus: [this.currentIdentityInformation?.maritalStatus, Validators.required],
        gender: [this.currentIdentityInformation?.gender, Validators.required],
        validUntil: [this.currentIdentityInformation?.validUntil, Validators.required],
      });
    }else{
      this.identityInformationForm.reset();
      this.identityInformationForm = this.formBuilder.group({
        userId: [userId, Validators.required],
        serialNumber: ["", Validators.required],
        fatherName: ["", Validators.required],
        motherName: ["", Validators.required],
        birthPlace: ["", Validators.required],
        birthYear: ["", Validators.required],
        maritalStatus: ["", Validators.required],
        gender: ["", Validators.required],
        validUntil: ["", Validators.required],
      });
    }
    
  }

  deneme(){
    console.log("TEST")
  }

  currentDrivingInformation:IdentityInformation
  getCurrentDrivingInformation(userId:number) {
    this.identityInformationService.getByUserId(userId).subscribe((response) => {
      this.currentIdentityInformation = response.data;
    });
  }

  currentUserCards:IdentityInformation
  getCurrentUserCards(userId:number) {
    this.identityInformationService.getByUserId(userId).subscribe((response) => {
      this.currentIdentityInformation = response.data;
    });
  }

  currentUserPhones:IdentityInformation
  getCurrentUserPhones(userId:number) {
    this.identityInformationService.getByUserId(userId).subscribe((response) => {
      this.currentIdentityInformation = response.data;
    });
  }

  add() {
    if (this.userAddForm.valid) {
      let userModel = Object.assign({}, this.userAddForm.value);
      this.userService.addUser(userModel).subscribe(
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
    if (this.userUpdateAndDeleteForm.valid) {
      let userModel = Object.assign({}, this.userUpdateAndDeleteForm.value);
      this.userService.deleteUser(userModel).subscribe(
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
    if (this.userUpdateAndDeleteForm.valid) {
      let userModel = Object.assign({}, this.userUpdateAndDeleteForm.value);
      this.userService.updateUser(userModel).subscribe(
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
