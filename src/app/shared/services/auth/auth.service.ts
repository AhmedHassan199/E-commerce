import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';
import { ForgetPassword, LoginData, newPassword, RegisterData, verifyRestCode } from '../../interfaces/data';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:BehaviorSubject<any> = new BehaviorSubject(null);
   newPasswordFlagSubject = new BehaviorSubject<boolean>(false);
   newPasswordFlag$ = this.newPasswordFlagSubject.asObservable();
   resetCodeFlagSubject = new BehaviorSubject<boolean>(false);
   resetCodeFlag$ = this.resetCodeFlagSubject.asObservable();


  constructor(private _HttpClient: HttpClient , private Router:Router , @Inject(PLATFORM_ID) id:object) {
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('userToken')) {
        this.DecodeUSerData();
      }
    }
   }
  signUp(data: RegisterData): Observable<any> {
    console.log(data)
    return this._HttpClient.post(`${Environment.apiUrl}/api/v1/auth/signup`, data);
  }
  login(data: LoginData): Observable<any> {
    console.log(data)
    return this._HttpClient.post(`${Environment.apiUrl}/api/v1/auth/signin`, data);
  }
  forgetPassword(data: ForgetPassword): Observable<any> {
    console.log(data)

    return this._HttpClient.post(`${Environment.apiUrl}/api/v1/auth/forgotPasswords`, data);
  }
  verifyResetCode(data:verifyRestCode): Observable<any> {
    console.log(data)

    return this._HttpClient.post(`${Environment.apiUrl}/api/v1/auth/verifyResetCode`, data);
  }
  addNewPassword(data:newPassword): Observable<any> {
    console.log(data)

    return this._HttpClient.put(`${Environment.apiUrl}/api/v1/auth/resetPassword`, data);
  }

  DecodeUSerData(){
    const token = JSON.stringify(localStorage.getItem('userToken')) ; // MUST STRING
    const decoded = jwtDecode(token);
    this.userData.next (decoded);

  }
  logOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
       this.Router.navigate(['/login'])

  }

  setNewPasswordFlag(value: boolean) {
    this.newPasswordFlagSubject.next(value);
  }
  setCodeFlag(value: boolean) {
    this.resetCodeFlagSubject.next(value);
  }
}
