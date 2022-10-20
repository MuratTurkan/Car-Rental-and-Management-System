import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/models/branch';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CaseType } from 'src/app/models/caseType';
import { Class } from 'src/app/models/class';
import { Color } from 'src/app/models/color';
import { Fuel } from 'src/app/models/fuel';
import { Gear } from 'src/app/models/gear';
import { BranchService } from 'src/app/services/branch.service';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CaseTypeService } from 'src/app/services/case-type.service';
import { ClassService } from 'src/app/services/class.service';
import { ColorService } from 'src/app/services/color.service';
import { FuelService } from 'src/app/services/fuel.service';
import { GearService } from 'src/app/services/gear.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  carDetailDtos: CarDetailDto[] = [];
  carAddForm: FormGroup;

  carUpdateAndDeleteForm: FormGroup;

  carUsables = [
    'Kullanılabilir',
    'Bakımda',
    'Kazalı',
    'Muayenesi Bitmiş',
    'Trafikten Men Edilmiş',
    'Kiralamaya Kapalı',
  ];

  carStars = [0.5];
  carStarsCreate() {
    for (let i = 1; i <= 5; i += 0.5) {
      this.carStars.push(i);
    }
  }

  modelYears = [1980];
  modelYearsCreate() {
    for (let i = 1981; i <= 2022; i++) {
      this.modelYears.push(i);
    }
  }

  car: Car = {
    carId: 0,
    brandId: 0,
    colorId: 0,
    branchId: 0,
    gearId: 0,
    fuelId: 0,
    classId: 0,
    caseId: 0,
    carPlate: '',
    carStar: 0,
    modelYear: 0,
    dailyPrice: 0,
    description: '',
    carUsable: '',
    carLocation: '',
  };

  brands: Brand[] = [];
  colors: Color[] = [];
  branchs: Branch[] = [];
  gears: Gear[] = [];
  fuels: Fuel[] = [];
  classes: Class[] = [];
  caseTypes: CaseType[] = [];

  carFilter = '';

  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private carImageService: CarImageService,
    private brandService: BrandService,
    private colorService: ColorService,
    private branchService: BranchService,
    private gearService: GearService,
    private fuelService: FuelService,
    private classService: ClassService,
    private caseTypeService: CaseTypeService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCarDetailDtos();
    this.modelYearsCreate();
    this.carStarsCreate();
    this.getBrands();
    this.getColors();
    this.getBranchs();
    this.getGears();
    this.getFuels();
    this.getClasses();
    this.getCaseTypes();
    this.createCarAddForm();
    this.createCarUpdateAndDeleteForm();
  }

  getCarDetailDtos() {
    this.carService.getCarDetailDtos().subscribe((response) => {
      this.carDetailDtos = response.data;
      this.dataLoaded = true;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBranchs() {
    this.branchService.getBranchs().subscribe((response) => {
      this.branchs = response.data;
    });
  }

  getGears() {
    this.gearService.getGears().subscribe((response) => {
      this.gears = response.data;
    });
  }

  getFuels() {
    this.fuelService.getFuels().subscribe((response) => {
      this.fuels = response.data;
    });
  }

  getClasses() {
    this.classService.getClasses().subscribe((response) => {
      this.classes = response.data;
    });
  }

  getCaseTypes() {
    this.caseTypeService.getCaseTypes().subscribe((response) => {
      this.caseTypes = response.data;
    });
  }

  createCarDetail(carId: number) {
    this.carService.detailCar(carId).subscribe((response) => {
      this.car = response.data;
      this.createCarUpdateAndDeleteForm();
    });
  }

  createCarUpdateAndDeleteForm() {
    this.carUpdateAndDeleteForm = this.formBuilder.group({
      carId: [this.car.carId, Validators.required],
      brandId: [this.car.brandId, Validators.required],
      colorId: [this.car.colorId, Validators.required],
      branchId: [this.car.branchId, Validators.required],
      gearId: [this.car.gearId, Validators.required],
      fuelId: [this.car.fuelId, Validators.required],
      classId: [this.car.classId, Validators.required],
      caseId: [this.car.caseId, Validators.required],
      carPlate: [this.car.carPlate, Validators.required],
      carStar: [this.car.carStar, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      description: [this.car.description, Validators.required],
      carUsable: [this.car.carUsable, Validators.required],
      carLocation: [this.car.carLocation, Validators.required],
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      branchId: ['', Validators.required],
      gearId: ['', Validators.required],
      fuelId: ['', Validators.required],
      classId: ['', Validators.required],
      caseId: ['', Validators.required],
      carPlate: ['', Validators.required],
      carStar: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      carUsable: ['', Validators.required],
      carLocation: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(
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
    if (this.carUpdateAndDeleteForm.valid) {
      let carModel = Object.assign({}, this.carUpdateAndDeleteForm.value);
      this.carService.deleteCar(carModel).subscribe(
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
    if (this.carUpdateAndDeleteForm.valid) {
      let carModel = Object.assign({}, this.carUpdateAndDeleteForm.value);
      this.carService.updateCar(carModel).subscribe(
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
