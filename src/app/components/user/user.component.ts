import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ConfirmedValidator } from 'src/app/validators/confirmed.validator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  updateProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  isLoggedIn: Observable<boolean>;
  currentUser: UserForLogin;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService: ProfileService,
    private router: Router,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.createUpdateProfileForm();
    this.createChangePasswordForm();
    this.isLoggedIn = this.authService.loginStatus;
    this.isLoggedIn.subscribe(() => {  //if logged in
      this.currentUser = this.authService.getUser()!;
    })
  }

  createUpdateProfileForm() {
    this.updateProfileForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      UserId:[Number(this.authService.getCurrentUserId)],
      oldPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      newPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      confirmNewPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmNewPassword')
    })
  }

  updateProfile() {
    if (this.updateProfileForm.valid) {
      let user: User = Object.assign({}, this.updateProfileForm.value);
      user.email = this.currentUser.email;
      user.id = Number(this.currentUser.id);
      this.userService.updateProfile(user).subscribe(() => {
        this.toastrService.success("Please relogin again.", "Your profile has been successfully updated");
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Profile could not be updated");
      })
    } else {
      this.toastrService.error("At least one of the entered information is incorrect", "Incorrect informations")
    }
  }

  

  changePassword(){
    if (this.changePasswordForm.valid) {
      let passwordModel = Object.assign({}, this.changePasswordForm.value);
      console.log(passwordModel);
      this.authService.changePassword(passwordModel).subscribe({next:(response) =>{
        this.toastrService.info(response.message, "Password updated");
      }, error:(responseError)=>{
        this.toastrService.error(responseError.error, "Error!");
      }});
    } else {
      this.toastrService.error("Please fill all of the field(s) properly", "Error!");
    }
  }
}