import { newPassword } from './../../../shared/interfaces/data';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  isLoading!:Boolean
  errMessage!:string;
  @Input() newEmail: string | null = null;
   constructor(private _AuthService:AuthService , private _Router:Router ){

   }

   ngOnInit(): void {
    if (this.email) {
      this.newPasswordForm.get('email')?.setValue(this.newEmail);
    }
  }
  newPasswordForm = new FormGroup({
     email: new FormControl('', [Validators.required, Validators.email]),
     newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
   });
   onSubmit() {
     if(this.newPasswordForm.valid){
       this.isLoading = true;
          this._AuthService.addNewPassword(this.newPasswordForm.value  as newPassword).subscribe({
           next: (res) => {
             localStorage.setItem('userToken',res.token)
             this._AuthService.DecodeUSerData();
           this.isLoading = false;
            this._Router.navigate(['/home'])
           },
           error: (error) => {
            this.isLoading = false;
             this.errMessage = error.error.message;
             console.log('Error creating user:', error);
           }
         });
     }
   }


   get email() { return this.newPasswordForm.get('email'); }
   get newPassword() { return this.newPasswordForm.get('newPassword'); }

}
