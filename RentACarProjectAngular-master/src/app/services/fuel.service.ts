import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fuel } from '../models/fuel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getFuels(): Observable<ListResponseModel<Fuel>> {
    let newPath = this.apiUrl + 'fuels/getall';
    return this.httpClient.get<ListResponseModel<Fuel>>(newPath);
  }

  addFuel(fuel: Fuel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'fuels/add';
    return this.httpClient.post<ResponseModel>(newPath, fuel);
  }

  updateFuel(fuel: Fuel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'fuels/update';
    return this.httpClient.post<ResponseModel>(newPath, fuel);
  }
  deleteFuel(fuel: Fuel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'fuels/delete';
    return this.httpClient.post<ResponseModel>(newPath, fuel);
  }

  detailFuel(fuelId: number) {
    let newPath = this.apiUrl + 'fuels/getById?fuelId=' + fuelId;
    return this.httpClient.get<SingleResponseModel<Fuel>>(newPath);
  }
}
