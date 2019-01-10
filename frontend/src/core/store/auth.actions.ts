import { Action } from '@ngrx/store';
import { LoginModel } from '../../app/models/login.model';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCES = '[Auth] Login Succes',
    LOGIN_FAIL = '[Auth] Login Fail'
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) {}
  }

  export class LogInSucces implements Action {
      readonly type = AuthActionTypes.LOGIN_SUCCES;
      constructor( public payload: any) {}
  }

  export class LogInFail implements Action {
      readonly type = AuthActionTypes.LOGIN_FAIL;
      constructor( public payload: string) {}
  }
  export type All =
    | LogIn
    | LogInSucces
    | LogInFail;
