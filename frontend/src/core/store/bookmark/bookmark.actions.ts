import { Action } from '@ngrx/store';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { ErrorData } from 'src/document/models/error.model';


export enum bookmarkTypes {
    FETCH = '[BOOKMARK] Fetch',
    FETCH_SUCCESS = '[BOOKMARK] Fetch Success',
    FETCH_FAILD = '[BOOKMARK] Fetch Faild'
}

export class Fetch implements Action {
    readonly type = bookmarkTypes.FETCH;
    constructor() {}
}

export class FetchSuccess implements Action {
    readonly type = bookmarkTypes.FETCH_SUCCESS;
    constructor( public payload: BookmarkModel[]) { }
}

export class FetchFaild implements Action {
    readonly type = bookmarkTypes.FETCH_FAILD;
    constructor( public payload: ErrorData) {}
}

export type All =
    |Fetch
    |FetchSuccess
    |FetchFaild;
