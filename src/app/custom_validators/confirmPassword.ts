import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const repassword = control.get('repassword');

    if (password && repassword && password.value !== repassword.value) {
      repassword.setErrors({ 'passwordMismatch': true });

      return { 'passwordMismatch': true };
    }
    repassword?.setErrors(null);
    return null;
  };
}
