import { CardDetailDto } from './../models/cardDetailDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient: HttpClient) {}

  getCards(): Observable<ListResponseModel<Card>> {
    let newPath = this.apiUrl + 'cards/getall';
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }

  getCardDetailDtos(): Observable<ListResponseModel<CardDetailDto>> {
    let newPath = this.apiUrl + 'cards/getcarddetails';
    return this.httpClient.get<ListResponseModel<CardDetailDto>>(newPath);
  }

  getCardDetailDtosByUserId(userId:number): Observable<ListResponseModel<CardDetailDto>> {
    let newPath = this.apiUrl + 'cards/getcarddetailsbyuserid?userId='+userId;
    return this.httpClient.get<ListResponseModel<CardDetailDto>>(newPath);
  }

  addCard(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cards/add';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }

  updateCard(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cards/update';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }
  deleteCard(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cards/delete';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }

  detailCard(cardId: number) {
    let newPath = this.apiUrl + 'cards/getById?cardId=' + cardId;
    return this.httpClient.get<SingleResponseModel<Card>>(newPath);
  }
}
