import { Action } from '@ngrx/store';
import { UserModel, UserWithoutPass, User } from '../models/user.model';
import { ErrorData } from '../models/error.model';

export enum userTypes {
    FETCH = '[User] Fetch',
    FETCH_SUCCESS = '[User] FetchSuccess',
    FETCH_ERROR = '[User] FetchError',
    SEND = '[User] Send',
    SEND_SUCCESS = '[User] SendSuccess',
    SEND_ERROR = '[User] SendError'
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

export class Send implements Action {
    readonly type = userTypes.SEND;
    constructor(readonly payload: User) {}
}

export class SendSuccess implements Action {
    readonly type = userTypes.SEND_SUCCESS;
    constructor(readonly payload: UserWithoutPass) {}
}

export class SentError implements Action {
    readonly type = userTypes.SEND_ERROR;
    constructor(readonly payload: ErrorData) {}
}

export type All =
    | Fetch
    | FetchSuccess
    | FetchError
    | Send
    | SendSuccess
    | SentError;
