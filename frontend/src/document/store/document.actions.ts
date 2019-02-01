import { Action } from '@ngrx/store';
import { DocumentModel } from '../models/document.model';
import { ErrorData } from '../models/error.model';

export enum prevsTypes {
    FETCH_PREVS = '[Document] FetchPrevs',
    FETCH_PREVS_SUCCESS = '[Document] FetchPrevsSuccess',
    FETCH_PREVS_ERROR = '[Document] FetchPrevsError',
}

export enum likedTypes {
    FETCH_LIKED = '[Document] FetchLiked',
    FETCH_LIKED_SUCCESS = '[Document] FetchLikedSuccess',
    FETCH_LIKED_ERROR = '[Document] FetchLikedError',
}

export enum docTypes {
    FETCH_DOC = '[Document] FetchDoc',
    FETCH_DOC_SUCCESS = '[Document] FetchDocSuccess',
    FETCH_DOC_ERROR = '[Document] FetchDocError',
}

export class FetchPrevs implements Action {
    readonly type = prevsTypes.FETCH_PREVS;
    constructor() {}
}

export class FetchLiked implements Action {
    readonly type = likedTypes.FETCH_LIKED;
    constructor() {}
}

export class FetchDoc implements Action {
    readonly type = docTypes.FETCH_DOC;
    constructor(public payload: number) {}
}

export class FetchPrevsSuccess implements Action {
    readonly type = prevsTypes.FETCH_PREVS_SUCCESS;
    constructor(public payload: any) {}
}

export class FetchPrevsError implements Action {
    readonly type = prevsTypes.FETCH_PREVS_ERROR;
    constructor(readonly payload: ErrorData) {}
}

export class FetchLikedSuccess implements Action {
    readonly type = likedTypes.FETCH_LIKED_SUCCESS;
    constructor(public payload: any) {}
}

export class FetchLikedError implements Action {
    readonly type = likedTypes.FETCH_LIKED_ERROR;
    constructor(readonly payload: ErrorData) {}
}

export class FetchDocSuccess implements Action {
    readonly type = docTypes.FETCH_DOC_SUCCESS;
    constructor(public payload: DocumentModel) {}
}

export class FetchDocError implements Action {
    readonly type = docTypes.FETCH_DOC_ERROR;
    constructor(readonly payload: ErrorData) {}
}

export type AllPrevs =
    | FetchPrevs
    | FetchPrevsSuccess
    | FetchPrevsError;

export type AllLiked =
    | FetchLiked
    | FetchLikedSuccess
    | FetchLikedError;


export type AllDoc =
    | FetchDoc
    | FetchDocSuccess
    | FetchDocError;
