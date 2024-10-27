import { product } from './../../../shared/interfaces/product';
import { ProductService } from './../../../shared/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { CategorySliderComponent } from "../../addtionals/category-slider/category-slider.component";
import { HomeSliderComponent } from "../../addtionals/home-slider/home-slider.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorySliderComponent, HomeSliderComponent , RouterLinkActive , RouterLink ,SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{
  productList !:product[];
  isLoading:boolean = true;
  userWord:string = '';
  constructor( private _ProductService:ProductService , private _CartService:CartService , private toastr: ToastrService ){}
 ngOnInit(): void {
   console.log('home')
   this.getAllProducts();
 }
 getAllProducts() {
  this._ProductService.getAllProducts().subscribe({
    next: (response) => {
      // Handle the response here (success case)
      this.productList = response.data;
        this.isLoading = false;
    },
    error: (error) => {
      // Handle the error here (error case)
      console.error(error);
      this.isLoading = false;

    },
    complete: () => {
      // Optional: Handle the completion of the observable
      console.log('Observable completed');
    }
  });
}
// home.component.ts and product.component.ts
addProductToCart(productId: string) {
  this._CartService.addProductWithNotification(productId);
}

// addProductToCart(productId: string) {
//   this._CartService.addProductToCart(productId).subscribe({
//     next: (response) => {
//       this.toastr.success(response.message, 'Cart info!' , {
//         progressBar : true
//       });

//       // Handle success response
//       console.log('Product added to cart successfully', response);
//       // You can show a success message, update cart count, or navigate
//     },
//     error: (err) => {
//       // Handle error response
//       console.error('Error adding product to cart', err);
//       // Show an error message or handle errors (e.g., authentication, server issues)
//     },
//     complete: () => {
//       console.log('Add to cart request completed');
//       // Optional: You can perform any actions after the request is complete
//     }
//   });
// }

}
