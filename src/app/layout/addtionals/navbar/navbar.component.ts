import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
isLogin:boolean = false;
cartCount:number = 0 ;
constructor(public _AuthService:AuthService , private _CartService:CartService ){}
ngOnInit(): void {
  // Subscribe to auth service to check login status
  this._AuthService.userData.subscribe(() => {
    if (this._AuthService.userData.getValue() != null) {
      this.isLogin = true;
      this._CartService.refreshCartCount(); // Fetch the cart count on login
    } else {
      this.isLogin = false;
    }
  });

  // Subscribe to cart count updates from CartService's BehaviorSubject
  this._CartService.productCount$.subscribe((count) => {
    this.cartCount = count;
  });
}



}
