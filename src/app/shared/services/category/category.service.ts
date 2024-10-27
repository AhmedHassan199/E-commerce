import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { categoryList } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCategories():Observable<categoryList>{
    return this._HttpClient.get<categoryList>(`${Environment.apiUrl}/api/v1/categories`)
  }
}
