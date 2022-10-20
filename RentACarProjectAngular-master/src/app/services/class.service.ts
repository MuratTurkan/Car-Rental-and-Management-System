import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../models/class';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getClasses(): Observable<ListResponseModel<Class>> {
    let newPath = this.apiUrl + 'classs/getall';
    return this.httpClient.get<ListResponseModel<Class>>(newPath);
  }

  addClass(classes: Class): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'classs/add';
    return this.httpClient.post<ResponseModel>(newPath, classes);
  }

  updateClass(classes: Class): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'classs/update';
    return this.httpClient.post<ResponseModel>(newPath, classes);
  }
  deleteClass(classes: Class): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'classs/delete';
    return this.httpClient.post<ResponseModel>(newPath, classes);
  }

  detailClass(classId: number) {
    let newPath = this.apiUrl + 'classs/getById?classId=' + classId;
    return this.httpClient.get<SingleResponseModel<Class>>(newPath);
  }
}
