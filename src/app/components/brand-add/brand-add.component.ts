import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent {
  brandAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private toastrService:ToastrService) {}

  ngOnInit():void{
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      
      brandName:["", Validators.required]
    });
  }

  add(){
    if (this.brandAddForm.valid) {
      let brandModule=Object.assign({},this.brandAddForm.value);
      this.brandService.add(brandModule).subscribe({
        next:(response)=>{
          this.toastrService.success(response.message,"Success")
        },
        error:(responseError)=>{
          console.log(responseError)
              this.toastrService.error(responseError.error.message,"Validation Error")

        }
      })
    }
    else{
      this.toastrService.error("Inccorect or missing data")
    }
  }
}