import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Brand } from "src/app/models/brand";
import { Car } from "src/app/models/car";
import { Color } from "src/app/models/color";
import { CarService } from "src/app/services/car.service";



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{
addToCart(_t84: Car) {
throw new Error('Method not implemented.');
}
currentCar: Car;
cars:Car[]=[];
filterText=""
dataLoaded=false;
filterColor:number=0;
filterBrand:number=0;
brands:Brand[];
colors:Color[];
findex = 300;

constructor(private carService:CarService, private activatedRoute:ActivatedRoute , private toastrService:ToastrService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else
      {
        this.getCars()
      }
    })
  }

  
  getCars(){
   this.carService.getCars().subscribe(response=>{
    this.cars=response.data
    this.dataLoaded=true;
   })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
     this.cars=response.data
     this.dataLoaded=true;
    })
   }

   getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
     this.cars=response.data
     this.dataLoaded=true;
    })
   }

   setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getCarsByBrandAndColorId(brandId:number,colorId:number){
    this.carService.getCarsByBrandAndColorId(brandId,colorId).subscribe(response=>{
    this.cars=response.data
    this.dataLoaded = true;    
    this.toastrService.success("Cars are listed");
    })  
  }

  tokenn(){
    if (localStorage.length>0) {
      return true;
    }else{
      return false;
    }
  }
  
}
