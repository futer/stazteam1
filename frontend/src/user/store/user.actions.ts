import { Action } from '@ngrx/store';
import { UserModel, UserFormModel } from '../models/user.model';
import { ErrorData } from '../models/error.model';

export enum currentTypes {
    SEND = '[Current] SEND',
    SEND_SUCCESS = '[Current] SEND SUCCESS',
    SEND_ERROR = '[Current] SEND ERROR',
    DESTROY = '[Current] DESTROY',
}

export class Send implements Action {
    readonly type = currentTypes.SEND;
    constructor(readonly payload: UserFormModel) {}
}

export class SendSuccess implements Action {
    readonly type = currentTypes.SEND_SUCCESS;
    constructor(readonly payload: UserModel) {}
}

export class SendError implements Action {
    readonly type = currentTypes.SEND_ERROR;
    constructor(readonly payload: ErrorData) {}
}

export class Destroy implements Action {
    readonly type = currentTypes.DESTROY;
    constructor() {}
}

export type All =
    | Send
    | SendSuccess
    | SendError
    | Destroy;
