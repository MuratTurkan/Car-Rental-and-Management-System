import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserOperationClaim } from '../models/userOperationClaim';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class UserOperationClaimService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getUserOperationClaims(): Observable<ListResponseModel<UserOperationClaim>> {
    let newPath = this.apiUrl + 'userOperationClaims/getall';
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newPath);
  }

  addUserOperationClaim(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'userOperationClaims/add';
    return this.httpClient.post<ResponseModel>(newPath, userOperationClaim);
  }

  updateUserOperationClaim(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'userOperationClaims/update';
    return this.httpClient.post<ResponseModel>(newPath, userOperationClaim);
  }
  deleteUserOperationClaim(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'userOperationClaims/delete';
    return this.httpClient.post<ResponseModel>(newPath, userOperationClaim);
  }

  detailUserOperationClaim(detailId: number) {
    let newPath = this.apiUrl + 'userOperationClaims/getById?detailId=' + detailId;
    return this.httpClient.get<SingleResponseModel<UserOperationClaim>>(newPath);
  }

  getUserOperationClaimsByUserId(userId: number) {
    let newPath = this.apiUrl + 'userOperationClaims/getByUserId?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<UserOperationClaim>>(newPath);
  }
}
