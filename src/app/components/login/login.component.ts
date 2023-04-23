import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  returnUrl: string;
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService , private router: Router , private route: ActivatedRoute) {}

  ngOnInit():void {
    this.createLoginForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      
      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe({next:(response) =>{
        
        this.toastrService.info(response.message);
        this.router.navigateByUrl(this.returnUrl);
        localStorage.setItem("token", response.data.token);} 
        
      ,error:(responseError)=>{
        
        this.toastrService.error(responseError.error)
      }})
    }
  }

  tokenn(){
    if (localStorage.length>0) {
      return true;
    }else{
      return false;
    }
  }

}