import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DrivingInformation } from '../models/drivingInformation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class DrivingInformationService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getDrivingInformations(): Observable<ListResponseModel<DrivingInformation>> {
    let newPath = this.apiUrl + 'drivingInformations/getall';
    return this.httpClient.get<ListResponseModel<DrivingInformation>>(newPath);
  }

  addDrivingInformation(drivingInformation: DrivingInformation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'drivingInformations/add';
    return this.httpClient.post<ResponseModel>(newPath, drivingInformation);
  }

  updateDrivingInformation(drivingInformation: DrivingInformation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'drivingInformations/update';
    return this.httpClient.post<ResponseModel>(newPath, drivingInformation);
  }

  deleteDrivingInformation(drivingInformation: DrivingInformation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'drivingInformations/delete';
    return this.httpClient.post<ResponseModel>(newPath, drivingInformation);
  }

  detailDrivingInformation(drivingId: number) {
    let newPath = this.apiUrl + 'drivingInformations/getById?drivingId=' + drivingId;
    return this.httpClient.get<SingleResponseModel<DrivingInformation>>(newPath);
  }

  getByUserId(userId: number) {
    let newPath = this.apiUrl + 'drivingInformations/getByUserId?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<DrivingInformation>>(newPath);
  }
}
