import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';

import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';

import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';

import { PayComponent } from './components/pay/pay.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register/register.component';
import { UserComponent } from './components/user/user.component';
import { LoginFormComponent } from './components/custom-form-controls/login-form/login.form/login.form.component';
const routes: Routes = [
  { path: "", pathMatch: "full", component: CarComponent ,canActivate:[LoginGuard] },
  { path: "cars", component: CarComponent },
  { path: "cars/brand/:brandId", component: CarComponent },
  { path: "cars/color/:colorId", component: CarComponent },
  { path: "cars/:carId", component: CarDetailComponent },
  { path: "payment/:rentalId/:rentPrice", component: PayComponent },
  { path: "cars/:id/payment/:rentalId/:rentPrice", component: PayComponent },

  { path: "rentals/add/:carId", component: RentalAddComponent },
  { path: "rentals/add", component: RentalAddComponent },


  { path: "payment/pay", component: PayComponent },
  //{ path: "cars/car/:carId", component: CarDetailComponent },
  { path: "payment/:rentalId/:rentPrice", component: PayComponent },


  { path: "cars/brand/:brandId", component: CarComponent },
  { path: "cars/color/:colorId", component: CarComponent },

  { path: "cars/car/add", component: CarAddComponent , canActivate:[LoginGuard] },
  { path: "cars/car/update", component: CarUpdateComponent },
  { path: "brand/add", component: BrandAddComponent , canActivate:[LoginGuard] },
  { path: "brands/update/:brandId", component: BrandUpdateComponent , canActivate:[LoginGuard] },
  { path: "color/add", component: ColorAddComponent , canActivate:[LoginGuard] },
  { path:"colors/update/:colorId",component: ColorUpdateComponent , canActivate:[LoginGuard]},
  
  { path:"login", component:LoginComponent},
  { path:"register", component:RegisterComponent},
  { path:"user", component:UserComponent, canActivate:[LoginGuard]},

  {path:"formcontrol", component:LoginFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }