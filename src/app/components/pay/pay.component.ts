import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { PaymentService } from 'src/app/services/payment.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
import { Car } from 'src/app/models/car';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit{
  payAddForm:FormGroup;
  payCount:number;
  carImages: CarImage[];
  cars:Car[]=[]; 
  car: Car;
  rentDate:string;
  currentCar: Car;
  dailyPrice:number;
  cards:Card[]=[{fullName:"Example", cardNumber:"1234123412341234", month:10,year:2020,cvv:"123",}];
  constructor(private formBuilder:FormBuilder,
    private paymentService:PaymentService,
    private toastrService:ToastrService,private activatedRoute:ActivatedRoute , private carImagesService:CarImageService){}
  
    ngOnInit(): void {
      this.createPayAddForm();
      this.activatedRoute.params.subscribe(params=>{
        this.payCount=Number(params["payCount"])
      })
      this.activatedRoute.params.subscribe(params => {
      
        this.getCarImagesByCarId(params["carId"]);
      })
    }
 
    createPayAddForm(){
      this.payAddForm=this.formBuilder.group({
        fullName:["",Validators.required],
        cardNumber:["",Validators.required],
        cvv:["",Validators.required],
        months:["",Validators.required],
        year:["",Validators.required],
      })
    }
    add(){
      if (this.payAddForm.valid) {
        let card:Card = Object.assign({},this.payAddForm.value);
          this.paymentService.pay(card).subscribe({
            next:(response=>{
              this.toastrService.success(response.message,"Successful!")
            }),
            error:(errorResponse=>{
              if(errorResponse.error.message){
                this.toastrService.error(errorResponse.error.message,"Validation error")
  
              }
            })
          })
      }else {
        this.toastrService.error("Please fill in all fields.", "Error!")
      }
    }

    getImagePath(carImage: CarImage): string {      
      //let url: string = "https://localhost:4200" + carImage.imagePath
      let url: string = "https://localhost:7001/Uploads/Images/"+carImage.imagePath;        
      return url     
    } 
    
    getCarImagesByCarId(carId:number){
    this.carImagesService.getCarImagesByCarId(carId).subscribe(response=>{
    this.carImages=response.data
    
    })  
    }
    setCurrentCar(car: Car) {
      this.currentCar = car;
    }

    addTo(card:Card){
      this.toastrService.success("Card saved", card.fullName);
      this.paymentService.addTo(card);
    }

   
}