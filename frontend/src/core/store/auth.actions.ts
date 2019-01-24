import { Action } from '@ngrx/store';
import { LoginModel } from '../../app/models/login.model';
import { ErrorData } from 'src/document/models/error.model';



export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCES = '[Auth] Login Succes',
    LOGIN_FAIL = '[Auth] Login Fail',
    LOGOUT = '[Auth] Logout',
    RELOAD = '[Auth] Reload',
    RELOAD_SUCCESS = '[Auth] Reload Success',
    RELOAD_FAIL = '[Auth] Reload Fail'
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

  export class Reload implements Action {
    readonly type = AuthActionTypes.RELOAD;
    constructor() {}
  }

  export class ReloadSuccess implements Action {
      readonly type = AuthActionTypes.RELOAD_SUCCESS;
      constructor( public payload: any) {
      }
  }

  export class ReloadFail implements Action {
      readonly type = AuthActionTypes.RELOAD_FAIL;
      constructor( public payload: ErrorData) {}
  }

  export type All =
    | LogIn
    | LogInSucces
    | LogInFail
    | Logout
    | Reload
    | ReloadSuccess
    | ReloadFail;
