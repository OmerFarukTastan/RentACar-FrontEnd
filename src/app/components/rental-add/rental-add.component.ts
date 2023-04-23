import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute , Router  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  rentals: Rental[] = [];
  constructor(private formBuilder:FormBuilder,
    private rentalService:RentalService,
    private toastrService:ToastrService , private router: Router){}

    ngOnInit(): void {
      this.createRentalAddForm();
    }

    createRentalAddForm(){
      this.rentalAddForm=this.formBuilder.group({
        carId:["",Validators.required],
        rentDate:["",Validators.required],
        returnDate:["",Validators.required],
        customerId:["",Validators.required]
      })
    }
    add(){
      if (this.rentalAddForm.valid) {
        let rental:Rental = Object.assign({}, this.rentalAddForm.value);
        
          this.rentalService.add(rental).subscribe({next:(response) =>{
          this.toastrService.success(response.message, "Success!");
          // if (response.success==true) {
          //   this.toastrService.success("Sepete eklendi")
          //   this.rentalService.add(rental);

          // }
        } ,error:responseError=>{  
          console.log(responseError.error.message)

          if(responseError){
           
              this.toastrService.error(responseError.error.message
                ,"Validation error")
                
          } 
          
        }}
        )
      } else {
        this.toastrService.error("Please fill all of the field(s) properly", "Error!")
      }
    }
    
    navigateToPay() {
      this.router.navigate(['payment/pay']);
    }
  
}