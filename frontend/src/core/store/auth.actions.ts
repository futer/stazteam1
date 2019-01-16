import { Action } from '@ngrx/store';
import { LoginModel } from '../../app/models/login.model';
import { ErrorData } from 'src/document/models/error.model';



export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCES = '[Auth] Login Succes',
    LOGIN_FAIL = '[Auth] Login Fail',
    LOGOUT = '[Auth] Logout',
    TOGGLE_NAVBAR = '[Auth] Toggle Navbar'
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) {}
  }

  export class LogInSucces implements Action {
      readonly type = AuthActionTypes.LOGIN_SUCCES;
      constructor( public payload: any) {
      }
  }

  export class LogInFail implements Action {
      readonly type = AuthActionTypes.LOGIN_FAIL;
      constructor( public payload: ErrorData) {}
  }

  export class Logout implements Action {
      readonly type = AuthActionTypes.LOGOUT;
  }

  export class ToggleNavbar implements Action {
      readonly type = AuthActionTypes.TOGGLE_NAVBAR;
      constructor (public payload: boolean) {}
  }

  export type All =
    | LogIn
    | LogInSucces
    | LogInFail
    | Logout
    | ToggleNavbar;
