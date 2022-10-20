import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageDetailDto } from 'src/app/models/carImageDetailDto';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-images',
  templateUrl: './car-images.component.html',
  styleUrls: ['./car-images.component.css'],
})
export class CarImagesComponent implements OnInit {
  carImageDetailDtos: CarImageDetailDto[] = [];
  carImageAddForm: FormGroup;

  carImageUpdateAndDeleteForm: FormGroup;
  carImage: CarImage = { imageId: 0, carId: 0, imagePath: '' };

  cars: Car[] = [];

  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private carImageService: CarImageService,
    private carService: CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  carImageFilter = '';

  ngOnInit(): void {
    this.getCarImageDetailDtos();
    this.getCars();
    this.createCarImageAddForm();
    this.createCarImageUpdateAndDeleteForm();
  }

  getCarImageDetailDtos() {
    this.carImageService.getCarImageDetailDtos().subscribe((response) => {
      this.carImageDetailDtos = response.data;
      this.dataLoaded = true;
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  createCarImageDetail(imageId: number) {
    this.carImageService.detailCarImage(imageId).subscribe((response) => {
      this.carImage = response.data;
      this.createCarImageUpdateAndDeleteForm();
    });
  }

  createCarImageUpdateAndDeleteForm() {
    this.carImageUpdateAndDeleteForm = this.formBuilder.group({
      imageId: [this.carImage.imageId, Validators.required],
      carId: [this.carImage.carId, Validators.required],
      imagePath: [this.carImage.imagePath, Validators.required],
    });
  }

  createCarImageAddForm() {
    this.carImageAddForm = this.formBuilder.group({
      carId: ['', Validators.required],
      imagePath: ['', Validators.required],
    });
  }

  add() {
    if (this.carImageAddForm.valid) {
      let carImageModel = Object.assign({}, this.carImageAddForm.value);
      this.carImageService.addCarImage(carImageModel).subscribe(
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
    if (this.carImageUpdateAndDeleteForm.valid) {
      let carImageModel = Object.assign(
        {},
        this.carImageUpdateAndDeleteForm.value
      );
      this.carImageService.deleteCarImage(carImageModel).subscribe(
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
    if (this.carImageUpdateAndDeleteForm.valid) {
      let carImageModel = Object.assign(
        {},
        this.carImageUpdateAndDeleteForm.value
      );
      this.carImageService.updateCarImage(carImageModel).subscribe(
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
