import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseType } from 'src/app/models/caseType';
import { CaseTypeService } from 'src/app/services/case-type.service';

@Component({
  selector: 'app-case-types',
  templateUrl: './case-types.component.html',
  styleUrls: ['./case-types.component.css'],
})
export class CaseTypesComponent implements OnInit {
  caseTypes: CaseType[] = [];
  caseTypeAddForm: FormGroup;

  caseTypeUpdateAndDeleteForm: FormGroup;
  caseType: CaseType = { caseId: 0, caseName: '' };

  caseTypeFilter = '';

  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private caseTypeService: CaseTypeService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCaseTypes();
    this.createCaseTypeAddForm();
    this.createCaseTypeUpdateAndDeleteForm();
  }

  getCaseTypes() {
    this.caseTypeService.getCaseTypes().subscribe((response) => {
      this.caseTypes = response.data;
      this.dataLoaded = true;
    });
  }

  createCaseTypeDetail(caseType: CaseType) {
    this.caseTypeService
      .detailCaseType(caseType.caseId)
      .subscribe((response) => {
        this.caseType = response.data;
        this.createCaseTypeUpdateAndDeleteForm();
      });
  }

  createCaseTypeUpdateAndDeleteForm() {
    this.caseTypeUpdateAndDeleteForm = this.formBuilder.group({
      caseId: [this.caseType.caseId, Validators.required],
      caseName: [this.caseType.caseName, Validators.required],
    });
  }

  createCaseTypeAddForm() {
    this.caseTypeAddForm = this.formBuilder.group({
      caseName: ['', Validators.required],
    });
  }

  add() {
    if (this.caseTypeAddForm.valid) {
      let caseTypeModel = Object.assign({}, this.caseTypeAddForm.value);
      this.caseTypeService.addCaseType(caseTypeModel).subscribe(
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
    if (this.caseTypeUpdateAndDeleteForm.valid) {
      let caseTypeModel = Object.assign(
        {},
        this.caseTypeUpdateAndDeleteForm.value
      );
      this.caseTypeService.deleteCaseType(caseTypeModel).subscribe(
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
    if (this.caseTypeUpdateAndDeleteForm.valid) {
      let caseTypeModel = Object.assign(
        {},
        this.caseTypeUpdateAndDeleteForm.value
      );
      this.caseTypeService.updateCaseType(caseTypeModel).subscribe(
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
