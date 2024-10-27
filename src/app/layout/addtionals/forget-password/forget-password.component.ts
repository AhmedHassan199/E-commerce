import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { VerifyResetCodeComponent } from '../verify-reset-code/verify-reset-code.component';
import { NewPasswordComponent } from '../new-password/new-password.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, VerifyResetCodeComponent, NewPasswordComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isLoading:boolean = false;
 errMessage!:string ;
 emailFormFlag : boolean = true;
  resetCodeForm: boolean = false;
  newPasswordForm: boolean = false;
  userEmail: string | null = null;
  forgetPasswordForm: FormGroup = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

  });

  constructor(private _AuthService:AuthService){

  }

  ngOnInit(): void {
    this._AuthService.newPasswordFlag$.subscribe((flag) => {
      this.newPasswordForm = flag;
    });
    this._AuthService.resetCodeFlag$.subscribe((flag) => {
      console.log(flag);
      this.resetCodeForm = flag;
    });
  }


  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      const email = this.forgetPasswordForm.value;
      console.log(email);
      this.isLoading = true;

      this._AuthService.forgetPassword(email).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.emailFormFlag = false;
          this.resetCodeForm = true
          this.userEmail = this.forgetPasswordForm.value.email;
          console.log(this.userEmail);
          // Handle the success response
          console.log('Email sent successfully:', response);
        },
        error: (err) => {
          this.isLoading = false;
          this.errMessage = err.error.message;

          // Handle the error response
          console.log('Error sending email:', err);
        },
        complete: () => {
          // Handle any cleanup or final actions
          console.log('Request complete');
        }
      });
    }
  }
  get email() { return this.forgetPasswordForm.get('email'); }

}
