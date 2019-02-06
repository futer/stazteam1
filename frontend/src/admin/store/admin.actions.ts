import { Action } from '@ngrx/store';
import { UserModel, UserWithoutPass, User } from '../../app/models/user-editor.model';
import { ErrorData } from '../models/error.model';

export enum userTypes {
    FETCH = '[User] Fetch',
    FETCH_SUCCESS = '[User] Fetch Success',
    FETCH_ERROR = '[User] Fetch Error',
    SEND = '[User] Send',
    SEND_SUCCESS = '[User] Send Success',
    SEND_ERROR = '[User] Send Error',
    DESTROY = '[User] Destroy'
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

export class Destroy implements Action {
    readonly type = userTypes.DESTROY;
    constructor() {}
}

export type All =
    | Fetch
    | FetchSuccess
    | FetchError
    | Send
    | SendSuccess
    | SentError
    | Destroy;
