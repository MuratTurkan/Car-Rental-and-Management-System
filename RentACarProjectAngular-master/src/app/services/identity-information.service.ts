import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentityInformation } from '../models/identityInformation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class IdentityInformationService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getIdentityInformations(): Observable<ListResponseModel<IdentityInformation>> {
    let newPath = this.apiUrl + 'identityInformations/getall';
    return this.httpClient.get<ListResponseModel<IdentityInformation>>(newPath);
  }

  addIdentityInformation(identityInformation: IdentityInformation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'identityInformations/add';
    return this.httpClient.post<ResponseModel>(newPath, identityInformation);
  }

  updateIdentityInformation(identityInformation: IdentityInformation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'identityInformations/update';
    return this.httpClient.post<ResponseModel>(newPath, identityInformation);
  }
  deleteIdentityInformation(identityInformation: IdentityInformation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'identityInformations/delete';
    return this.httpClient.post<ResponseModel>(newPath, identityInformation);
  }

  detailIdentityInformation(identityId: number) {
    let newPath = this.apiUrl + 'identityInformations/getById?identityId=' + identityId;
    return this.httpClient.get<SingleResponseModel<IdentityInformation>>(newPath);
  }

  getByUserId(userId: number) {
    let newPath = this.apiUrl + 'identityInformations/getByUserId?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<IdentityInformation>>(newPath);
  }
}
