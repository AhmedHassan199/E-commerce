import { CartService } from './../../../shared/services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { specificProduct, specificProductData } from '../../../shared/interfaces/product';
import { ProductService } from './../../../shared/services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent  implements OnInit{
  product!:specificProductData;
 constructor(private _ProductService:ProductService , private route: ActivatedRoute , private _CartService:CartService){

 }



  ngOnInit(): void {
    this.getProductDetails();

  }


  getProductDetails() {
    let productId !: string ;
    this.route.params.subscribe({
      next: (params) => {
        productId = params['id'];
      },
    })
    this._ProductService.getSpecificProduct(productId).subscribe({
      next: (response) => {
        this.product = response.data;
        console.log(this.product);
      },
      error: (err) => {
        console.error('Error fetching product details:', err); // Handle error scenario
      }
    });
  }


  addProductToCart(productId: string) {
    this._CartService.addProductWithNotification(productId);
  }

}
