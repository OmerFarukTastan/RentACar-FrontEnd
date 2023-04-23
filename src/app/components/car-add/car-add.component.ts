import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent {
  carAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private carService:CarService, private toastrService:ToastrService) {}

  ngOnInit():void{
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      
      brandId:["", Validators.required],
      colorId:["", Validators.required],
      modelYear:["", Validators.required],
      dailyPrice:["", Validators.required],
      description:["", Validators.required]
    });
  }



  add() {
    if (this.carAddForm.valid) {
      let carModule= Object.assign({},this.carAddForm.value)

      

      this.carService.add(carModule).subscribe({
        next:(response)=>{
          this.toastrService.success(response.message,"Success")
        },
        error:(responseError)=>{
          
          if(responseError.error.ValidationErrors){

            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {

              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error")
            }

          }
          else {
            this.toastrService.error(responseError.error.Message,"Error")
          }
        }
      })
    }
    else{
      this.toastrService.error("Incorrect or missing data")
    }
  }
}