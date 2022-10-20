import { Observable } from 'rxjs';
import { ResponseModel } from './../models/responseModel';
import { RegisterModel } from './../models/registerModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './../models/loginModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { TokenModel } from './../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelperService: JwtHelperService = new JwtHelperService();

  apiUrl = 'https://localhost:44349/api/auth/';

  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'login',
      loginModel
    );
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'register',
      registerModel
    );
  }

  get getToken() {
    return localStorage.getItem('token');
  }

  get getDecodedToken() {
    let token = this.getToken;
    return this.jwtHelperService.decodeToken(token);
  }

  get getCurrentUserId() {
    let decodedToken = this.getDecodedToken;
    let nameidentifierString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/nameidentifier')
    )[0];
    let userId = decodedToken[nameidentifierString];
    return parseInt(userId);
  }

  loggedIn() {
    let token = this.getToken;
    return !this.jwtHelperService.isTokenExpired(token);
  }

  getRole() {
    if (!this.loggedIn()) return false;

    let decodedToken = this.getDecodedToken;

    let roleString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/role')
    )[0];
    let role = '';
    if (roleString) {
      for (let i = 0; i < decodedToken[roleString].length; i++) {
        role += decodedToken[roleString][i];
      }
    }

    return role;
  }

  getCurrentUserName() {
    if (!this.loggedIn()) return false;

    let decodedToken = this.getDecodedToken;

    let roleString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/name')
    )[0];
    let role = '';
    if (roleString) {
      for (let i = 0; i < decodedToken[roleString].length; i++) {
        role += decodedToken[roleString][i];
      }
    }

    return role;
  }
}
