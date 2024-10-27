import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginData } from '../../../shared/interfaces/data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  ngOnInit(): void {
    console.log('login')
  }

  isLoading!:Boolean
  errMessage!:string;
   constructor(private _AuthService:AuthService , private _Router:Router ){
     console.log("hi");
   }
  loginForm = new FormGroup({
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', [Validators.required, Validators.minLength(6)]),
   });
   onSubmitLogin() {
     if(this.loginForm.valid){
       this.isLoading = true;
          this._AuthService.login(this.loginForm.value as LoginData).subscribe({
           next: (res) => {
             localStorage.setItem('userToken',res.token)
             this._AuthService.DecodeUSerData();
           this.isLoading = false;
            this._Router.navigate(['/home'])
             console.log('User created:', res);
           },
           error: (error) => {
            this.isLoading = false;
             this.errMessage = error.error.message;
             console.log('Error creating user:', error);
           }
         });
     }
   }


   get email() { return this.loginForm.get('email'); }
   get password() { return this.loginForm.get('password'); }

}
