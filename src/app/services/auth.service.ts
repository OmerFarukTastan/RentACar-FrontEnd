import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { UserPasswordModel } from '../models/userPasswordModel';
import { ResponseModel } from '../models/responseModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserForLogin } from '../models/userForLogin';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:7001/api/auth/";
  public jwtHelperService: JwtHelperService = new JwtHelperService();
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenExpired());

  constructor(private httpClient:HttpClient,
    private LocalStorageService:LocalStorageService) {}

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login", loginModel);
  }

  public get loginStatus() {
    return this.loggedIn.asObservable();
  }

  public get isLoggedIn() {
    return this.loggedIn.getValue();
  }

  public set isLoggedIn(status: boolean) {
    this.loggedIn.next(status);
  } 

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }

   getUser(): UserForLogin | undefined {
    let token = this.getToken();
    if (token != null) {
      let tokenDetails = Object.entries(this.jwtHelperService.decodeToken(token));
      let user: UserForLogin = new UserForLogin;
      tokenDetails.forEach(detail => {
        switch (detail[0]) {
          case "email": {
            user.email = String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": {
            user.name = String(detail[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
            user.roles = detail[1] as Array<string>
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
            user.id = Number(detail[1]);
          }
        }
      });
      if (!user.roles) {  
        user.roles = [];
      }
      return user;
    }
    return undefined;
  }

  hasRole(user: UserForLogin, role: string): boolean {
    if (user.roles.indexOf(role) !== -1) {
      return true;
    }
    return false;
  }

  changePassword(updatedUser: UserPasswordModel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'changepassword';
    return this.httpClient.post<ResponseModel>(newPath, updatedUser);
  }

  private isTokenExpired(): boolean {
    let token = this.getToken();
    if (token != null) {
      return !this.jwtHelperService.isTokenExpired(token);
    }
    return false;
  }

  private getToken(): string | null {
    return this.LocalStorageService.getItem("token");
  } 

  get getCurrentUserId() {
    let decodedToken = this.getDecodedToken;
    let userIdString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/nameidentifier')
    )[0];
    let userId: number = decodedToken[userIdString];
    return userId;
  }

  get getDecodedToken() {
    let token = this.LocalStorageService.getItem("token");
    return this.jwtHelperService.decodeToken(token);
  }
}