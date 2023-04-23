import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css']
})
export class PaymentSummaryComponent {
  cards:Card[]=[];

  constructor(private paymentService:PaymentService, private toastrService:ToastrService) {}

  ngOnInit():void{
    this.getCart();
  }

  getCart(){
    this.cards = this.paymentService.list();
  }
}