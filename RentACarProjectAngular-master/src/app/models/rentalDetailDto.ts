export interface RentalDetailDto {
  rentalId: number;
  userId: number;
  carId: number;
  branchId: number;
  nationalityId: string;
  carPlate: string;
  branchName: string;
  rentDate: Date;
  returnDate: Date;
  rentalPrice: number;
}
