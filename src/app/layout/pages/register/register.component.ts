import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../custom_validators/confirmPassword';
import { RegisterData } from '../../../shared/interfaces/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading!:Boolean
 errMessage!:string;
  constructor(private _AuthService:AuthService , private _Router:Router ){
    console.log("hi");
  }
  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,  Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/g)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, { validators: passwordMatchValidator() });
  onSubmit() {
    if(this.profileForm.valid){
      this.isLoading = true;
         this._AuthService.signUp(this.profileForm.value as RegisterData).subscribe({
          next: (res) => {
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


  get name() { return this.profileForm.get('name'); }
  get email() { return this.profileForm.get('email'); }
  get phone() { return this.profileForm.get('phone'); }
  get password() { return this.profileForm.get('password'); }
  get rePassword() { return this.profileForm.get('repassword'); }

}
