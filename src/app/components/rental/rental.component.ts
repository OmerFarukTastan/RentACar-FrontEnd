import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalResponseModel } from 'src/app/models/rentalResponseModel';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:Rental[] = [];
  dataLoaded = false;

  constructor(private rentalService:RentalService){}
 
  ngOnInit(): void{
    
    this.getRental();
    
  }

  getRental(){ 
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals = response.data
      this.dataLoaded = true;
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
