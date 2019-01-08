import { Action } from '@ngrx/store';
import { DocumentModel } from '../models/document.model';
import { ErrorData } from '../models/error.model';

export enum docTypes {
  FETCH = '[Document] Fetch',
  FETCH_SUCCESS = '[Document] FetchSuccess',
  FETCH_ERROR = '[Document] FetchError'
}

export class Fetch implements Action {
    readonly type = docTypes.FETCH;
    constructor() {}
}


export class FetchSuccess implements Action {
    readonly type = docTypes.FETCH_SUCCESS;
    constructor(public payload: DocumentModel[]) {}
}


export class FetchError implements Action {
    readonly type = docTypes.FETCH_ERROR;
    constructor(readonly payload: ErrorData) {}
}

export type All =
    | Fetch
    | FetchSuccess
    | FetchError;
