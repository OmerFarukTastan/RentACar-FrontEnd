import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  

  apiUrl="https://localhost:7001/api/"

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl + "cars/getbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl + "cars/getbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getbycarid?carId="+carId 
    return this.httpClient.get<ListResponseModel<Car>>(newPath);    
   }

   getCarsByBrandAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getcardetailsbybrandandcolorid?brandId="+brandId+"&colorId="+colorId 
    return this.httpClient.get<ListResponseModel<Car>>(newPath);     
   }

   add(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/add"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
  update(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"Cars/update"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

  getByCarId(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+"/cars/getbycarid?carId="+carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }
}