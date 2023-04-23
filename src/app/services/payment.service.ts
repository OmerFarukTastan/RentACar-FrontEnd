import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Cards } from '../models/cards';


@Injectable({
  providedIn: 'root'
})
export class PaymentService  {
  apiUrl = 'https://localhost:7001/api/Payments/';

  constructor(private httpClient:HttpClient) { }

  getPayments():Observable<ListResponseModel<Card>>{
    let newUrl=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Card>>(newUrl)
  }
  pay(card:Card):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"pay",card)
  }

  addTo(card:Card){
    let item = Cards.find(c => c.cvv==card.cvv);
    if(item){
      item.cvv += 0;
    }else{
      
      card.fullName = "Card";
      card.cardNumber= ((<HTMLInputElement>document.getElementById("cardNumber")).value);;
      card.cvv=((<HTMLInputElement>document.getElementById("cvv")).value);;
      Cards.push(card);
      console.log(Cards);
    }
  }

  list():Card[]{
    return Cards;
  }
}