import { OperationClaim } from './../models/operationClaim';
import { UserDetailDto } from './../models/userDetailDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getall';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserDetailDtos(): Observable<ListResponseModel<UserDetailDto>> {
    let newPath = this.apiUrl + 'users/getuserdetails';
    return this.httpClient.get<ListResponseModel<UserDetailDto>>(newPath);
  }

  getByUserId(userId:number): Observable<SingleResponseModel<UserDetailDto>> {
    let newPath = this.apiUrl + 'users/getbyuserid?userId='+userId;
    return this.httpClient.get<SingleResponseModel<UserDetailDto>>(newPath);
  }

  getByCustomers(): Observable<ListResponseModel<UserDetailDto>> {
    let newPath = this.apiUrl + 'users/getbycustomers';
    return this.httpClient.get<ListResponseModel<UserDetailDto>>(newPath);
  }

  getByUserClaim(userId:number) {
    let newPath = this.apiUrl + 'users/getbyuserclaim?userId='+userId;
    return this.httpClient.get<SingleResponseModel<OperationClaim>>(newPath);
  }

  addUser(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'users/add';
    return this.httpClient.post<ResponseModel>(newPath, user);
  }

  updateUser(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'users/update';
    return this.httpClient.post<ResponseModel>(newPath, user);
  }
  deleteUser(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'users/delete';
    return this.httpClient.post<ResponseModel>(newPath, user);
  }

  detailUser(userId: number) {
    let newPath = this.apiUrl + 'users/getById?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
