import { AbstractControl } from '@angular/forms';


export function passwordMatcher( c: AbstractControl): { [key: string]: boolean} | null {
    const passwordControl = c.get('password');
    const repeatControl = c.get('repeatPassword');
    if (passwordControl.pristine || repeatControl.pristine) {
      return null;
    }
    if (passwordControl.value === repeatControl.value) {
      return null;
    }
    return { 'match': true };
  }

export function passwordTouchedChecker ( c: AbstractControl ): { [key: string]: boolean } | null  {
  const oldPassword = c.get('oldPassword');
  const newPassword = c.get('passwordGroup.password');
  const repeatPassword = c.get('passwordGroup.repeatPassword');

  if ( oldPassword.value === '' && newPassword.value === '' && repeatPassword.value === '') {
    return null;
  }
  if ( oldPassword.pristine || newPassword.pristine || repeatPassword.pristine ) {
    if ( oldPassword.pristine && newPassword.pristine && repeatPassword.pristine ) {
      return null;
    }
    return { 'match': true };
  }
  if (oldPassword.value === newPassword.value) {
    return { 'match': true };
  }
  return null;
}
