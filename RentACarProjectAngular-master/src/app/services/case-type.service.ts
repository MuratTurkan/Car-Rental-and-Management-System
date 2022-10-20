import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseType } from '../models/caseType';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CaseTypeService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getCaseTypes(): Observable<ListResponseModel<CaseType>> {
    let newPath = this.apiUrl + 'caseTypes/getall';
    return this.httpClient.get<ListResponseModel<CaseType>>(newPath);
  }

  addCaseType(caseType: CaseType): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'caseTypes/add';
    return this.httpClient.post<ResponseModel>(newPath, caseType);
  }

  updateCaseType(caseType: CaseType): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'caseTypes/update';
    return this.httpClient.post<ResponseModel>(newPath, caseType);
  }
  deleteCaseType(caseType: CaseType): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'caseTypes/delete';
    return this.httpClient.post<ResponseModel>(newPath, caseType);
  }

  detailCaseType(caseId: number) {
    let newPath = this.apiUrl + 'caseTypes/getById?caseId=' + caseId;
    return this.httpClient.get<SingleResponseModel<CaseType>>(newPath);
  }
}
