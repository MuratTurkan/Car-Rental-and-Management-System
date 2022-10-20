import { Branch } from './../../../models/branch';
import { BranchService } from './../../../services/branch.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { RentalDetailService } from 'src/app/services/rental-detail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.css'],
})
export class RentalDetailsComponent implements OnInit {
  rentalDetailDtos: RentalDetailDto[] = [];

  rentalDetailUpdateAndDeleteForm: FormGroup;
  rentalDetail: RentalDetail;

  cars: Car[] = [];
  branchs: Branch[] = [];

  rentalDetailFilter = '';

  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private rentalDetailService: RentalDetailService,
    private userService: UserService,
    private authService: AuthService,
    private carService: CarService,
    private branchService: BranchService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRentalDetailDtos();
    this.getCustomers();
    this.getCars();
    this.getBranchs();
  }

  getRentalDetailDtos() {
    if (this.getRole() == 'Müşteri') {
      this.rentalDetailService
        .getRentalDetailDtosByUserId(this.authService.getCurrentUserId)
        .subscribe((response) => {
          this.rentalDetailDtos = response.data;
          this.dataLoaded = true;
        });
    } else {
      this.rentalDetailService.getRentalDetailDtos().subscribe((response) => {
        this.rentalDetailDtos = response.data;
        console.log(response.data)
        this.dataLoaded = true;
      });
    }
  }

  getRole() {
    return this.authService.getRole();
  }

  customers: User[] = [];
  getCustomers() {
    this.userService.getByCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getBranchs() {
    this.branchService.getBranchs().subscribe((response) => {
      this.branchs = response.data;
    });
  }

  createRentalDetail(rentalId: number) {
    this.rentalDetailService
      .detailRentalDetail(rentalId)
      .subscribe((response) => {
        this.rentalDetail = response.data;
        this.createRentalDetailUpdateAndDeleteForm();
      });
  }

  createRentalDetailUpdateAndDeleteForm() {
    if (this.rentalDetail) {
      this.rentalDetailUpdateAndDeleteForm = this.formBuilder.group({
        rentalId: [this.rentalDetail.rentalId, Validators.required],
        userId: [this.rentalDetail.userId, Validators.required],
        carId: [this.rentalDetail.carId, Validators.required],
        branchId: [this.rentalDetail.branchId, Validators.required],
        rentDate: [
          this.rentalDetail.rentDate.toString().split('T')[0],
          Validators.required,
        ],
        returnDate: [
          this.rentalDetail.returnDate.toString().split('T')[0],
          Validators.required,
        ],
        rentalPrice: [this.rentalDetail.rentalPrice, Validators.required],
      });
    }
  }

  delete() {
    if (this.rentalDetailUpdateAndDeleteForm.valid) {
      let rentalDetailModel = Object.assign(
        {},
        this.rentalDetailUpdateAndDeleteForm.value
      );
      this.rentalDetailService.deleteRentalDetail(rentalDetailModel).subscribe(
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
