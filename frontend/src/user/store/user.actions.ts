import { Action } from '@ngrx/store';
import { UserModel } from '../models/user.model';
import { ErrorData } from '../models/error.model';

export enum userTypes {
    FETCH = '[User] Fetch',
    FETCH_SUCCESS = '[User] FetchSuccess',
    FETCH_ERROR = '[User] FetchError'
}

export class Fetch implements Action {
    readonly type = userTypes.FETCH;
    constructor() {}
}

export class FetchSuccess implements Action {
    readonly type = userTypes.FETCH_SUCCESS;
    constructor(public payload: UserModel) {}
}

export class FetchError implements Action {
    readonly type = userTypes.FETCH_ERROR;
    constructor(readonly payload: ErrorData) {}
}

export type All =
    | Fetch
    | FetchSuccess
    | FetchError;
