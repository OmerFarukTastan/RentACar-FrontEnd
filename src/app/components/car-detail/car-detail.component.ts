import { Component,OnInit } from '@angular/core';
import { ActivatedRoute , Router  } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { Brand } from 'src/app/models/brand';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']  
})
export class CarDetailComponent implements OnInit{

  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute , private cartService:CartService,
    private toastrService:ToastrService, private router: Router) { }


    dataLoaded = false;
    cars:Car[]=[]; 
    car: Car;
    brand: Brand;
    carImages: CarImage[];
    findex = 300;
  
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        this.getCarByCarId(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
      })
    }

    getCarByCarId(carId: number) {
      this.carService.getCarsByCarId(carId).subscribe(response => {
        this.car = response.data[0];
        this.dataLoaded = true;
      })
    }
  
     getCarImagesByCarId(carId: number) {
      this.carImageService.getCarImagesByCarId(carId).subscribe(response => {
        this.carImages = response.data;
        this.dataLoaded = true;
      })
    } 

     getImagePath(carImage: CarImage): string {      
        //let url: string = "https://localhost:4200" + carImage.imagePath
        let url: string = "https://localhost:7001/Uploads/Images/"+carImage.imagePath;        
        return url     
    } 

    getCars(){
      this.carService.getCars().subscribe(response=>{
       this.cars=response.data
       this.dataLoaded=true;
      })
     }

     addToCart(car:Car){ 
  
      this.toastrService.success("Added to Cart",car.description)
      this.cartService.addToCart(car);
  
  
  
    }

    navigateToDetails(carId: number) {
      this.router.navigate(['/rentals/add', carId]);
    }
    
    

}