import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../../services/car.service';
import { CarDetailDto } from './../../../models/carDetailDto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarImageService } from './../../../services/car-image.service';
import { CarImage } from './../../../models/carImage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-images',
  templateUrl: './car-images.component.html',
  styleUrls: ['./car-images.component.css'],
})
export class CarImagesComponent implements OnInit {
  constructor(
    private carImageService: CarImageService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getCarImages();
    this.getCarDetailDto();
  }
  carImages: CarImage[] = [];

  getCarImages() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carImageService
          .getByCarId(params['carId'])
          .subscribe((response) => {
            this.carImages = response.data;
            this.carImages.length = 4;
            this.createImageForm();
          });
      }
    });
  }

  carDetailDto:CarDetailDto
  getCarDetailDto(){
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carService.getCarDetailDtos().subscribe((response) => {
          this.carDetailDto = response.data.find(
            (c) => c.carId == params['carId']
          );
        });
      }
    });
  }

  imageDelete(carImage: CarImage) {
    this.carImageService.deleteCarImage(carImage).subscribe((response) => {
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
    });
  }

  imageForm: FormGroup;
  imageAdd() {
    if (this.imageForm.valid) {
      let imageForm = Object.assign({}, this.imageForm.value);
      this.carImageService.addCarImage(imageForm).subscribe((response) => {
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
      });
    } else {
      this.toastrService.error("Form Tamamlanmadı", 'Hata');
    }
  }

  createImageForm() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.imageForm = this.formBuilder.group({
          carId: [parseInt(params['carId'])],
          imagePath: ['', Validators.required],
        });
      }
    });
  }

  pageRefresh(){
    window.location.reload()
  }
}
