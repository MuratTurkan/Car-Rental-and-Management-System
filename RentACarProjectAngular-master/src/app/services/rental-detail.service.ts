import { RentalDetailDto } from './../models/rentalDetailDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetail } from '../models/rentalDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalDetailService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentalDetails/getall';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalDetailDtos(): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + 'rentalDetails/getrentaldetails';
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }

  getRentalDetailDtosByUserId(userId:number): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + 'rentalDetails/getrentaldetailsbyuserid?userId='+userId;
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }

  addRentalDetail(rentalDetail: RentalDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentalDetails/add';
    return this.httpClient.post<ResponseModel>(newPath, rentalDetail);
  }

  updateRentalDetail(rentalDetail: RentalDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentalDetails/update';
    return this.httpClient.post<ResponseModel>(newPath, rentalDetail);
  }
  deleteRentalDetail(rentalDetail: RentalDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentalDetails/delete';
    return this.httpClient.post<ResponseModel>(newPath, rentalDetail);
  }

  detailRentalDetail(rentalId: number) {
    let newPath = this.apiUrl + 'rentalDetails/getById?rentalId=' + rentalId;
    return this.httpClient.get<SingleResponseModel<RentalDetail>>(newPath);
  }
}
