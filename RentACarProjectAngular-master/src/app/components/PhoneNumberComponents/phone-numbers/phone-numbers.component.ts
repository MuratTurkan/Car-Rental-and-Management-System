import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PhoneNumber } from 'src/app/models/phoneNumber';
import { PhoneNumberDetailDto } from 'src/app/models/phoneNumberDetailDto';
import { User } from 'src/app/models/user';
import { PhoneNumberService } from 'src/app/services/phone-number.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-phone-numbers',
  templateUrl: './phone-numbers.component.html',
  styleUrls: ['./phone-numbers.component.css'],
})
export class PhoneNumbersComponent implements OnInit {
  phoneNumberDetailDtos: PhoneNumberDetailDto[] = [];
  phoneNumberAddForm: FormGroup;

  phoneNumberUpdateAndDeleteForm: FormGroup;
  phoneNumber: PhoneNumber = { phoneId: 0, userId: 0, phoneNo: '' };

  users: User[] = [];

  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private phoneNumberService: PhoneNumberService,
    private userService: UserService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  phoneNumberFilter = '';

  ngOnInit(): void {
    this.getPhoneNumberDetailDtos();
    this.getUsers();
    this.createPhoneNumberAddForm();
    this.createPhoneNumberUpdateAndDeleteForm();
  }

  getPhoneNumberDetailDtos() {
    this.phoneNumberService.getPhoneNumberDetailDtos().subscribe((response) => {
      this.phoneNumberDetailDtos = response.data;
      this.dataLoaded = true;
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
    });
  }

  createPhoneNumberDetail(phoneId: number) {
    this.phoneNumberService.detailPhoneNumber(phoneId).subscribe((response) => {
      this.phoneNumber = response.data;
      this.createPhoneNumberUpdateAndDeleteForm();
    });
  }

  createPhoneNumberUpdateAndDeleteForm() {
    this.phoneNumberUpdateAndDeleteForm = this.formBuilder.group({
      phoneId: [this.phoneNumber.phoneId, Validators.required],
      userId: [this.phoneNumber.userId, Validators.required],
      phoneNo: [this.phoneNumber.phoneNo, Validators.required],
    });
  }

  createPhoneNumberAddForm() {
    this.phoneNumberAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      phoneNo: ['', Validators.required],
    });
  }

  add() {
    if (this.phoneNumberAddForm.valid) {
      let phoneNumberModel = Object.assign({}, this.phoneNumberAddForm.value);
      this.phoneNumberService.addPhoneNumber(phoneNumberModel).subscribe(
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
    if (this.phoneNumberUpdateAndDeleteForm.valid) {
      let phoneNumberModel = Object.assign(
        {},
        this.phoneNumberUpdateAndDeleteForm.value
      );
      this.phoneNumberService.deletePhoneNumber(phoneNumberModel).subscribe(
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
    if (this.phoneNumberUpdateAndDeleteForm.valid) {
      let phoneNumberModel = Object.assign(
        {},
        this.phoneNumberUpdateAndDeleteForm.value
      );
      this.phoneNumberService.updatePhoneNumber(phoneNumberModel).subscribe(
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
