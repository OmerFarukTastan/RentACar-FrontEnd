import { Component } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent {
  findex:number = 500;
  user:User;
  isLoggedIn: Observable<boolean>;
  currentUser: UserForLogin;
  constructor(
    private authService: AuthService,private localStorageService:LocalStorageService,private toastrService:ToastrService
  ) { }
  ngDoCheck  (): void {
    
    this.isLoggedIn = this.authService.loginStatus;
    this.isLoggedIn.subscribe(() => {  
      this.currentUser = this.authService.getUser()!;
    })
  }

  tokenn(){
    if (localStorage.length>0) {
      return true;
    }else{
      return false;
    }
  }

  logout(){
    this.localStorageService.remove("token");
    window.location.reload();
    this.toastrService.info("Logout successful");
  }

  
}
