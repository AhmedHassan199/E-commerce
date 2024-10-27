import { ProductdetailsComponent } from './layout/addtionals/productdetails/productdetails.component';
import { Routes } from '@angular/router';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { NotfoundComponent } from './layout/addtionals/notfound/notfound.component';
import { authGuard } from './shared/gaurds/auth.guard';
import { ForgetPasswordComponent } from './layout/addtionals/forget-password/forget-password.component';

export const routes: Routes = [

  { path: 'brands', component: BrandsComponent , canActivate :[authGuard]},
  { path: 'cart', component: CartComponent  , canActivate :[authGuard] },
  { path: 'products', component: ProductsComponent  , canActivate :[authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent  , canActivate :[authGuard] },
  { path: 'product-details/:id', component: ProductdetailsComponent  , canActivate :[authGuard] },
  { path: 'home', component: HomeComponent   , canActivate :[authGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];
