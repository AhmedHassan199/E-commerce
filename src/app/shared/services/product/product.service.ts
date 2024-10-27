import { product } from './../../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { productRes, specificProduct } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProducts():Observable<productRes>{
    return this._HttpClient.get<productRes>(`${Environment.apiUrl}/api/v1/products`);
  }
  getSpecificProduct(product_id :string):Observable<specificProduct>{
    return this._HttpClient.get<specificProduct>(`${Environment.apiUrl}/api/v1/products/${product_id}`);
  }
}
