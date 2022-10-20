import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BranchDetailDto } from 'src/app/models/branchDetailDto';
import { BranchService } from 'src/app/services/branch.service';
import { CityService } from 'src/app/services/city.service';
import { Branch } from '../../../models/branch';
import { City } from '../../../models/city';

@Component({
  selector: 'app-branchs',
  templateUrl: './branchs.component.html',
  styleUrls: ['./branchs.component.css'],
})
export class BranchsComponent implements OnInit {
  branchDetailDtos: BranchDetailDto[] = [];
  branchAddForm: FormGroup;

  branchUpdateAndDeleteForm: FormGroup;
  branch: Branch = { branchId: 0, cityId: 0, branchName: '' };

  branchFilter = '';

  cities: City[] = [];
  filteredCities: Record<string, string>[] = []

  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private branchService: BranchService,
    private cityService: CityService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBranchDetailDtos();
    this.getCities();
    this.createBranchAddForm();
    this.createBranchUpdateAndDeleteForm();
  }

  getBranchDetailDtos() {
    this.branchService.getBranchDetailDtos().subscribe((response) => {
      this.branchDetailDtos = response.data;
      this.dataLoaded = true;
    });
  }

  getCities() {
    this.cityService.getCities().subscribe((response) => {
      this.cities = response.data;
    });
  }

  createBranchDetail(branchId: number) {
    this.branchService.detailBranch(branchId).subscribe((response) => {
      this.branch = response.data;
      this.createBranchUpdateAndDeleteForm();
    });
  }

  createBranchUpdateAndDeleteForm() {
    this.branchUpdateAndDeleteForm = this.formBuilder.group({
      branchId: [this.branch.branchId, Validators.required],
      cityId: [this.branch.cityId, Validators.required],
      branchName: [this.branch.branchName, Validators.required],
    });
  }

  createBranchAddForm() {
    this.branchAddForm = this.formBuilder.group({
      cityId: ['', Validators.required],
      branchName: ['', Validators.required],
    });
  }

  add() {
    if (this.branchAddForm.valid) {
      let branchModel = Object.assign({}, this.branchAddForm.value);
      this.branchService.addBranch(branchModel).subscribe(
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
    if (this.branchUpdateAndDeleteForm.valid) {
      let branchModel = Object.assign({}, this.branchUpdateAndDeleteForm.value);
      this.branchService.deleteBranch(branchModel).subscribe(
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
    if (this.branchUpdateAndDeleteForm.valid) {
      let branchModel = Object.assign({}, this.branchUpdateAndDeleteForm.value);
      this.branchService.updateBranch(branchModel).subscribe(
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
