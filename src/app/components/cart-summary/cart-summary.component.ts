import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  cartItems:CartItem[]=[];
  constructor(private cartService:CartService, private toastrService:ToastrService , private router:Router){}


  ngOnInit(): void {
    this.getCart();
  }
  getCart(){
    this.cartItems=this.cartService.list();
  }
  removeFromCart(car:Car){
    this.cartService.removeFromCart(car);
    this.toastrService.error(car.description + "is removed from cart" , "Removed")
    this.router.navigate(['/cars'])
  } 
}