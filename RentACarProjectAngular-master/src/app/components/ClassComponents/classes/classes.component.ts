import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/app/models/class';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  classes: Class[] = [];
  classAddForm: FormGroup;

  classUpdateAndDeleteForm: FormGroup;
  class: Class = { classId: 0, className: '' };

  classFilter = '';

  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getClasses();
    this.createClassAddForm();
    this.createClassUpdateAndDeleteForm();
  }

  getClasses() {
    this.classService.getClasses().subscribe((response) => {
      this.classes = response.data;
      this.dataLoaded = true;
    });
  }

  createClassDetail(classs: Class) {
    this.classService.detailClass(classs.classId).subscribe((response) => {
      this.class = response.data;
      this.createClassUpdateAndDeleteForm();
    });
  }

  createClassUpdateAndDeleteForm() {
    this.classUpdateAndDeleteForm = this.formBuilder.group({
      classId: [this.class.classId, Validators.required],
      className: [this.class.className, Validators.required],
    });
  }

  createClassAddForm() {
    this.classAddForm = this.formBuilder.group({
      className: ['', Validators.required],
    });
  }

  add() {
    if (this.classAddForm.valid) {
      let classModel = Object.assign({}, this.classAddForm.value);
      this.classService.addClass(classModel).subscribe(
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
    if (this.classUpdateAndDeleteForm.valid) {
      let classModel = Object.assign({}, this.classUpdateAndDeleteForm.value);
      this.classService.deleteClass(classModel).subscribe(
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
    if (this.classUpdateAndDeleteForm.valid) {
      let classModel = Object.assign({}, this.classUpdateAndDeleteForm.value);
      this.classService.updateClass(classModel).subscribe(
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
