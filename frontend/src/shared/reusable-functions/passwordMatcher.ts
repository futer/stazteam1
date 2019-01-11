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
