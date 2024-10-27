import { product } from './../../interfaces/product';
import { cart } from './../../interfaces/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators'; // Importing tap operator

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private token: string | null = null;
  private productCountSubject = new BehaviorSubject<number>(0);
  public productCount$ = this.productCountSubject.asObservable();

  constructor(private _HttpClient: HttpClient, private toastr: ToastrService) {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('userToken');
    }
  }

  addProductToCart(productId: string): Observable<any> {
    const headers = {
      token: this.token || ''
    };
    const body = { productId: productId };
    return this._HttpClient.post<any>(
      `${Environment.apiUrl}/api/v1/cart`,
      body,
      { headers: headers }
    )
  }

  getProductsInCart(): Observable<cart> {
    const headers = {
      token: this.token || ''
    };
    return this._HttpClient.get<cart>(
      `${Environment.apiUrl}/api/v1/cart`,
      { headers: headers }
    );
  }

  updateProductCart(productId: string, count: number): Observable<cart> {
    const headers = {
      token: this.token || ''
    };
    return this._HttpClient.put<cart>(
      `${Environment.apiUrl}/api/v1/cart/${productId}`,
      { count: count },
      { headers: headers }
    )
  }

  deleteProductCart(productId: string): Observable<cart> {
    const headers = {
      token: this.token || ''
    };
    return this._HttpClient.delete<cart>(
      `${Environment.apiUrl}/api/v1/cart/${productId}`,
      { headers: headers }
    )
  }

  addProductWithNotification(productId: string): void {
    this.addProductToCart(productId).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Cart info!', {
          progressBar: true
        });
      },
      error: (err) => {
        console.error('Error adding product to cart', err);
      }
    });
  }

  /**
   * Refreshes the cart count and updates the BehaviorSubject.
   */
  public refreshCartCount(): void {
    this.getProductsInCart().subscribe({
      next: (cart) => {
        this.updateProductCount(cart.numOfCartItems);
      },
      error: (err) => {
        console.error('Error refreshing cart count', err);
      }
    });
  }

  /**
   * Updates the cart count BehaviorSubject.
   */
  updateProductCount(count: number): void {
    this.productCountSubject.next(count);
  }
}
