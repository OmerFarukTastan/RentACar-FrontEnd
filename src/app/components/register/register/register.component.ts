import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private registerService:RegisterService, private toastrService:ToastrService) {}

  ngOnInit():void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstname:["", Validators.required],
      lastname:["", Validators.required],
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.valid);
      let loginModel = Object.assign({}, this.registerForm.value)

      this.registerService.register(loginModel).subscribe({next:(response) =>{
        this.toastrService.info(response.message);
        localStorage.setItem("token", response.data.token);
      },error: responseError => {
        //console.log(responseError)
        this.toastrService.error(responseError.error)
      }})
    }
  }
}