import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiURL = "https://localhost:7001/api/";

  constructor(
    private httpClient: HttpClient
  ) { }

  updateProfile(user: User): Observable<ResponseModel> {
    let newPath = this.apiURL + 'users/updatebydto'
    return this.httpClient.post<ResponseModel>(newPath, user);
  }
}