import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent {
  colorAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private colorService:ColorService, private toastrService:ToastrService) {}

  ngOnInit():void{
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      
      colorName:["", Validators.required]
    });
  }

  add(){
    if (this.colorAddForm.valid) {
      let colorModule=Object.assign({},this.colorAddForm.value);
      this.colorService.add(colorModule).subscribe({
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
      this.toastrService.error("Incorrect or missing data")
    }
  }
}