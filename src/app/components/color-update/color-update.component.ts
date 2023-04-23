import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-update-color',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent {
  updateFormGroup: FormGroup;
  constructor(private colorService:ColorService, private router:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService) {}
  color =new FormGroup({colorName:new FormControl('')});

  ngOnInit(): void {
    this.colorService.getColorById( Number(this.router.snapshot.paramMap.get('colorId'))).subscribe((result:any)=>{
      this.color =new FormGroup({
        colorName:new FormControl(result.data["colorName"], Validators.required),
      });
    });
  }

  Update(){
    if(this.color.valid){
      let a:any= this.color.value.colorName;
      let color:Color=Object.assign({colorId:Number(this.router.snapshot.paramMap.get('colorId'))},{colorName:a})
      this.colorService.update(color).subscribe({
        next:(response)=>{
          this.toastrService.success(response.message)
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
      }

     
      )
    }
    else{
      this.toastrService.error("Please fill all of the field(s) properly")
    }
  }
}