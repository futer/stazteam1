import { Action } from '@ngrx/store';
import { DocumentModel } from '../models/document.model';
import { ErrorData } from '../models/error.model';

export enum docTypes {
  FETCH_PREVS = '[Document] FetchPrevs',
  FETCH_DOC = '[Document] FetchDoc',
  FETCH_SUCCESS = '[Document] FetchSuccess',
  FETCH_ERROR = '[Document] FetchError'
}

export class FetchPrevs implements Action {
    readonly type = docTypes.FETCH_PREVS;
    constructor() {}
}

export class FetchDoc implements Action {
    readonly type = docTypes.FETCH_DOC;
    constructor(public payload: number) {}
}

export class FetchSuccess implements Action {
    readonly type = docTypes.FETCH_SUCCESS;
    constructor(public payload: DocumentModel) {}
}


export class FetchError implements Action {
    readonly type = docTypes.FETCH_ERROR;
    constructor(readonly payload: ErrorData) {}
}

export type All =
    | FetchPrevs
    | FetchDoc
    | FetchSuccess
    | FetchError;
