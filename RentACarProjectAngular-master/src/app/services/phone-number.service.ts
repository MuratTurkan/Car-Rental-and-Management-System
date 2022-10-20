import { PhoneNumberDetailDto } from './../models/phoneNumberDetailDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneNumber } from '../models/phoneNumber';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class PhoneNumberService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getPhoneNumbers(): Observable<ListResponseModel<PhoneNumber>> {
    let newPath = this.apiUrl + 'phoneNumbers/getall';
    return this.httpClient.get<ListResponseModel<PhoneNumber>>(newPath);
  }

  getPhoneNumberDetailDtos(): Observable<ListResponseModel<PhoneNumberDetailDto>> {
    let newPath = this.apiUrl + 'phoneNumbers/getphonenumberdetails';
    return this.httpClient.get<ListResponseModel<PhoneNumberDetailDto>>(newPath);
  }

  addPhoneNumber(phoneNumber: PhoneNumber): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'phoneNumbers/add';
    return this.httpClient.post<ResponseModel>(newPath, phoneNumber);
  }

  updatePhoneNumber(phoneNumber: PhoneNumber): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'phoneNumbers/update';
    return this.httpClient.post<ResponseModel>(newPath, phoneNumber);
  }
  deletePhoneNumber(phoneNumber: PhoneNumber): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'phoneNumbers/delete';
    return this.httpClient.post<ResponseModel>(newPath, phoneNumber);
  }

  detailPhoneNumber(phoneId: number) {
    let newPath = this.apiUrl + 'phoneNumbers/getById?phoneId=' + phoneId;
    return this.httpClient.get<SingleResponseModel<PhoneNumber>>(newPath);
  }

  getByUserPhoneNumbers(userId: number): Observable<ListResponseModel<PhoneNumber>> {
    let newPath = this.apiUrl + 'phoneNumbers/getByUserPhoneNumbers?userId=' + userId;
    return this.httpClient.get<ListResponseModel<PhoneNumber>>(newPath);
  }
}
