import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gear } from '../models/gear';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class GearService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getGears(): Observable<ListResponseModel<Gear>> {
    let newPath = this.apiUrl + 'gears/getall';
    return this.httpClient.get<ListResponseModel<Gear>>(newPath);
  }

  addGear(gear: Gear): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'gears/add';
    return this.httpClient.post<ResponseModel>(newPath, gear);
  }

  updateGear(gear: Gear): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'gears/update';
    return this.httpClient.post<ResponseModel>(newPath, gear);
  }
  deleteGear(gear: Gear): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'gears/delete';
    return this.httpClient.post<ResponseModel>(newPath, gear);
  }

  detailGear(gearId: number) {
    let newPath = this.apiUrl + 'gears/getById?gearId=' + gearId;
    return this.httpClient.get<SingleResponseModel<Gear>>(newPath);
  }
}
