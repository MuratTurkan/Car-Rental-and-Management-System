import { CarImage } from 'src/app/models/carImage';
export interface CarDetailDto {
  carId: number;
  branchId: number;
  brandName: string;
  colorName: string;
  branchName: string;
  gearName: string;
  fuelName: string;
  className: string;
  caseName: string;
  carPlate: string;
  carStar: number;
  modelYear: number;
  dailyPrice: number;
  description: string;
  carUsable: string;
  carLocation: string;
  carImages:CarImage[]
}
