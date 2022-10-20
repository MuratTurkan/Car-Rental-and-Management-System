import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationClaim } from '../models/operationClaim';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class OperationClaimService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getOperationClaims(): Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'operationClaims/getall';
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }

  addOperationClaim(operationClaim: OperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'operationClaims/add';
    return this.httpClient.post<ResponseModel>(newPath, operationClaim);
  }

  updateOperationClaim(operationClaim: OperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'operationClaims/update';
    return this.httpClient.post<ResponseModel>(newPath, operationClaim);
  }
  deleteOperationClaim(operationClaim: OperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'operationClaims/delete';
    return this.httpClient.post<ResponseModel>(newPath, operationClaim);
  }

  detailOperationClaim(claimId: number) {
    let newPath = this.apiUrl + 'operationClaims/getById?claimId=' + claimId;
    return this.httpClient.get<SingleResponseModel<OperationClaim>>(newPath);
  }
}
