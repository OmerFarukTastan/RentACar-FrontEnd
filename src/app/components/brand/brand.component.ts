import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{
brands:Brand[]=[];

currentBrand:Brand;
dataLoaded=false;
constructor(private brandService:BrandService,  private router: Router){}

ngOnInit(): void {
  this.getBrands();
}


getBrands(){
  this.brandService.getBrands().subscribe(response=>{
    this.brands=response.data
    this.dataLoaded=true;
  })
}

setCurrentBrand(brand:Brand){
  this.currentBrand=brand;
}

getCurrentBrandClass(brand:Brand){
  if(brand==this.currentBrand)
  {
    return "list-group-item active"
  }
  else{
    return "list-group-item"
  }
}

brandUpdate(){
  this.router.navigate(['/brand/add']);
}

tokenn(){
  if (localStorage.length>0) {
    return true;
  }else{
    return false;
  }
}


}