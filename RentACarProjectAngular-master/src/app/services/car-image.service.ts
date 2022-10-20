import { CarImageDetailDto } from './../models/carImageDetailDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getCarImages(): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'carImages/getall';
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getByCarId(carId:number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'carImages/getbycarid?carId='+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImageDetailDtos(): Observable<ListResponseModel<CarImageDetailDto>> {
    let newPath = this.apiUrl + 'carImages/getcarimagedetails';
    return this.httpClient.get<ListResponseModel<CarImageDetailDto>>(newPath);
  }

  addCarImage(carImage: CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'carImages/add';
    return this.httpClient.post<ResponseModel>(newPath, carImage);
  }

  updateCarImage(carImage: CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'carImages/update';
    return this.httpClient.post<ResponseModel>(newPath, carImage);
  }
  deleteCarImage(carImage: CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'carImages/delete';
    return this.httpClient.post<ResponseModel>(newPath, carImage);
  }

  detailCarImage(imageId: number) {
    let newPath = this.apiUrl + 'carImages/getById?imageId=' + imageId;
    return this.httpClient.get<SingleResponseModel<CarImage>>(newPath);
  }
}
