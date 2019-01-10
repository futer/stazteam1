import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login'
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) {}
  }

  export type All =
    | LogIn;
