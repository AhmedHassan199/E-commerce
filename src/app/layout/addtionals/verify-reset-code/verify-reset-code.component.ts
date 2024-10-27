import { newPassword } from './../../../shared/interfaces/data';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-verify-reset-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.scss'
})
export class VerifyResetCodeComponent {
  isLoading:boolean = false;
  errMessage!:string ;
  resetCodeForm: FormGroup = new FormGroup({

    resetCode: new FormControl('', [
       Validators.required,
       Validators.pattern(/^\d{6}$/)


     ]),

   });

   constructor(private _AuthService:AuthService){

   }
   onSubmit() {
    console.log(this.resetCodeForm);
     if (this.resetCodeForm.valid) {
       const resetCode = this.resetCodeForm.value;
       console.log(resetCode);
       this.isLoading = true;

       this._AuthService.verifyResetCode(this.resetCodeForm.value).subscribe({
         next: (response) => {
          this._AuthService.setNewPasswordFlag (true);
          this._AuthService.setCodeFlag (false);
           this.isLoading = false;
           // Handle the success response
           console.log('resetCode sent successfully:', response);
         },
         error: (err) => {
           this.isLoading = false;
           this.errMessage = err.error.message;

           // Handle the error response
           console.log('resetCode sending email:', err);
         },
         complete: () => {
           // Handle any cleanup or final actions
           console.log('Request complete');
         }
       });
     }
   }
   get resetCode() { return this.resetCodeForm.get('resetCode'); }

}
