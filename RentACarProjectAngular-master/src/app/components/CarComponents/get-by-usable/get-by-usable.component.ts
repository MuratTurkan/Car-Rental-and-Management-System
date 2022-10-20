import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Branch } from 'src/app/models/branch';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { BranchService } from 'src/app/services/branch.service';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CaseTypeService } from 'src/app/services/case-type.service';
import { ClassService } from 'src/app/services/class.service';
import { ColorService } from 'src/app/services/color.service';
import { FuelService } from 'src/app/services/fuel.service';
import { GearService } from 'src/app/services/gear.service';
import { Card } from './../../../models/card';
import { CarImage } from './../../../models/carImage';
import { User } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { CarImageService } from './../../../services/car-image.service';
import { CardService } from './../../../services/card.service';
import { RentalDetailService } from './../../../services/rental-detail.service';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-get-by-usable',
  templateUrl: './get-by-usable.component.html',
  styleUrls: ['./get-by-usable.component.css'],
})
export class GetByUsableComponent implements OnInit {
  carDetailDtos: CarDetailDto[] = [];

  minRentDate = new Date().toISOString().split('T')[0];
  maxRentDate = new Date(new Date().setDate(new Date().getDate() + 30))
    .toISOString()
    .split('T')[0];

  minReturnDate = '';
  maxReturnDate = new Date(new Date().setDate(new Date().getDate() + 30))
    .toISOString()
    .split('T')[0];

  createMinReturnDate() {
    let getByUsable = Object.assign({}, this.getByUsable.value);
    if (getByUsable.rentDate != '') {
      this.minReturnDate = getByUsable.rentDate;
      return true;
    }
    return false;
  }

  getByUsable: FormGroup;

  branchs: Branch[] = [];
  brands = [{ name: 'Tümü', value: '' }];
  colors = [{ name: 'Tümü', value: '' }];
  gears = [{ name: 'Tümü', value: '' }];
  fuels = [{ name: 'Tümü', value: '' }];
  classes = [{ name: 'Tümü', value: '' }];
  caseTypes = [{ name: 'Tümü', value: '' }];
  YıldızSayısı = [{ name: 'Tümü', value: '' }];

  brandFilter = '';
  colorFilter = '';
  gearFilter = '';
  fuelFilter = '';
  classFilter = '';
  caseTypeFilter = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private carService: CarService,
    private cardService: CardService,
    private carImageService: CarImageService,
    private branchService: BranchService,
    private brandService: BrandService,
    private colorService: ColorService,
    private gearService: GearService,
    private fuelService: FuelService,
    private classService: ClassService,
    private caseTypeService: CaseTypeService,
    private rentalDetailService: RentalDetailService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createGetByUsableForm();
    this.createPaymentForm(null);
    this.getCustomers();
    this.getBranchs();
    this.getBrands();
    this.getColors();
    this.getGears();
    this.getFuels();
    this.getClasses();
    this.getCaseTypes();
  }

  createGetByUsableForm() {
    this.getByUsable = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      branchId: ['', Validators.required],
      userId: [''],
    });
  }

  paymentForm: FormGroup;
  createPaymentForm(carDetailDto: CarDetailDto) {
    if(carDetailDto){
    this.paymentForm = this.formBuilder.group({
      price:[this.fiyatHesapla(carDetailDto.dailyPrice),Validators.required],
      carDetailDto: [carDetailDto, Validators.required],
    });}
  }

  dataLoaded = false;
  gunHesapla() {
    let getByUsable = Object.assign({}, this.getByUsable.value);

    var rentParts = getByUsable.rentDate.split('-');
    var rentDate = new Date(rentParts[0], rentParts[1] - 1, rentParts[2]);

    var returnParts = getByUsable.returnDate.split('-');
    var returnDate = new Date(
      returnParts[0],
      returnParts[1] - 1,
      returnParts[2]
    );

    var date1 = Date.UTC(
      returnDate.getFullYear(),
      returnDate.getMonth(),
      returnDate.getDate()
    );
    var date2 = Date.UTC(
      rentDate.getFullYear(),
      rentDate.getMonth(),
      rentDate.getDate()
    );

    var day = Math.floor((date1 - date2) / 1000 / 60 / 60 / 24) + 1;
    return day;
  }

  fiyat:number
  fiyatHesapla(dailyPrice: number) {
    var day = this.gunHesapla();
    this.fiyat=day*dailyPrice
    return day * dailyPrice;
  }

  customers: User[] = [];
  getCustomers() {
    this.userService.getByCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  getBranchs() {
    this.branchService.getBranchs().subscribe((response) => {
      this.branchs = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      for (var i = 0; i < response.data.length; i++) {
        this.brands.push({
          name: response.data[i].brandName,
          value: response.data[i].brandName,
        });
      }
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      for (var i = 0; i < response.data.length; i++) {
        this.colors.push({
          name: response.data[i].colorName,
          value: response.data[i].colorName,
        });
      }
    });
  }

  getGears() {
    this.gearService.getGears().subscribe((response) => {
      for (var i = 0; i < response.data.length; i++) {
        this.gears.push({
          name: response.data[i].gearName,
          value: response.data[i].gearName,
        });
      }
    });
  }

  getFuels() {
    this.fuelService.getFuels().subscribe((response) => {
      for (var i = 0; i < response.data.length; i++) {
        this.fuels.push({
          name: response.data[i].fuelName,
          value: response.data[i].fuelName,
        });
      }
    });
  }

  getClasses() {
    this.classService.getClasses().subscribe((response) => {
      for (var i = 0; i < response.data.length; i++) {
        this.classes.push({
          name: response.data[i].className,
          value: response.data[i].className,
        });
      }
    });
  }

  getCaseTypes() {
    this.caseTypeService.getCaseTypes().subscribe((response) => {
      for (var i = 0; i < response.data.length; i++) {
        this.caseTypes.push({
          name: response.data[i].caseName,
          value: response.data[i].caseName,
        });
      }
    });
  }

  deneme() {
    if (this.getByUsable.valid) {
      let rentModel = Object.assign({}, this.getByUsable.value);
      let now = new Date();

      var rentParts = rentModel.rentDate.split('-');
      var rentDate = new Date(rentParts[0], rentParts[1] - 1, rentParts[2]);

      var returnParts = rentModel.returnDate.split('-');
      var returnDate = new Date(
        returnParts[0],
        returnParts[1] - 1,
        returnParts[2]
      );
      this.carService.getByUsable(rentModel).subscribe(
        (response) => {
          this.carDetailDtos = response.data;
          console.log(this.carDetailDtos);
          if (this.carDetailDtos.length > 0) {
            this.dataLoaded = true;
          } else {
            this.dataLoaded = false;
            this.toastrService.info(
              'Seçilen özelliklere uygun araç bulunamadı.',
              'Hata'
            );
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Form Tamamlanmadı.', 'Hata');
    }
  }

  getRole() {
    return this.authService.getRole();
  }

  rentControl() {
    let paymentModel = Object.assign({}, this.paymentForm.value);
    let rentModel = Object.assign({}, this.getByUsable.value);
    let rentalAddModel = {
      carId: paymentModel.carDetailDto.carId,
      userId: 0,
      branchId: rentModel.branchId,
      rentDate: rentModel.rentDate,
      returnDate: rentModel.returnDate,
      rentalPrice: this.fiyatHesapla(paymentModel.carDetailDto.dailyPrice),
    };
    if (!localStorage.getItem('token')) {
      this.toastrService.error("Araçların Kiralanabilmesi Giriş Yapılması Gerekmektedir.", 'Hata');
    } else if (this.getRole() == 'Müşteri') {
      let userId = this.authService.getCurrentUserId;
      rentalAddModel.userId = userId;
      this.rentCar(rentalAddModel);
    } else if (this.getRole() == 'Yönetici' || this.getRole() == 'Çalışan') {
      rentalAddModel.userId = rentModel.userId;
      this.rentCar(rentalAddModel);
    } else {
      this.toastrService.error('Bu işlemi yapmak için yetkiniz yok. Sistem yöneticisine başvurun !!!', 'Hata');
    }
  }

  rentCar(rentalAddModel: any) {
    if (rentalAddModel.userId) {
      this.rentalDetailService.addRentalDetail(rentalAddModel).subscribe(
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
      this.toastrService.error('Kullanıcı Bilgisi Seçilmedi.', 'Hata');
    }
  }

  pageRefresh() {
    window.location.reload();
  }

  carImages = [
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
  ];
  carIm: CarImage[] = [];
  createCarImage(carId: number) {
    this.carImageService.getByCarId(carId).subscribe((response) => {
      this.carIm = response.data;
    });
    return this.carImages;
  }
}
