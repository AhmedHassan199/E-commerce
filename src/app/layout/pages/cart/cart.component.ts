import { Data } from './../../../shared/interfaces/cart';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit{
  DataOfCart!:Data;
  constructor(private CartService:CartService){}

ngOnInit(): void {
this.getProductsInCart();
}
getProductsInCart(){
this.CartService.getProductsInCart().subscribe({
next:(res)=>{
  this.DataOfCart = res.data;
console.log( this.DataOfCart);
},
})
}
updateProductCount(productId:string , count:number){
console.log( productId , count );

this.CartService.updateProductCart(productId , count).subscribe({
next:(res)=>{
  this.DataOfCart = res.data;
console.log( this.DataOfCart);
},
})
}
deleteProductCount(productId:string){

this.CartService.deleteProductCart(productId ).subscribe({
next:(res)=>{
  this.DataOfCart = res.data;
console.log( this.DataOfCart);
},
})
}




}
