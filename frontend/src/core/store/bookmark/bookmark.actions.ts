import { Action } from '@ngrx/store';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { ErrorData } from 'src/document/models/error.model';



export enum bookmarkTypes {
    SET_CURRENT_BOOKMARK = '[BOOKMARK] Set Current Bookmark',

    FETCH = '[BOOKMARK] Fetch',
    FETCH_SUCCESS = '[BOOKMARK] Fetch Success',
    FETCH_FAILD = '[BOOKMARK] Fetch Faild',

    UPDATE = '[BOOKMARK] Update',
    UPDATE_SUCCESS = '[BOOKAMARK] Update Succes',
    UPDATE_FAILD = '[BOOKMARK] Update Faild',

    DELETE = '[BOOKMARK] Delete',
    DELETE_SUCCESS = '[BOOKMARK] Delete Succes',
    DELETE_FAILD = '[BOOKMARK] Delete Faild',

    ADD_BOOKMARK = '[BOOKMARK] Add Bookmark',
    ADD_BOOKMARK_SUCCESS = '[BOOKMARK] Add Bookmark Success',
    ADD_BOOKMARK_FAILD = '[BOOKMARK] Add Bookmark Faild'

}

export class SetCurrentBookmark implements Action {
    readonly type = bookmarkTypes.SET_CURRENT_BOOKMARK;

    constructor(public payload: BookmarkModel) {}
}

export class Fetch implements Action {
    readonly type = bookmarkTypes.FETCH;
}

export class FetchSuccess implements Action {
    readonly type = bookmarkTypes.FETCH_SUCCESS;
    constructor( public payload: BookmarkModel[]) { }
}

export class FetchFaild implements Action {
    readonly type = bookmarkTypes.FETCH_FAILD;
    constructor( public payload: ErrorData) {}
}

export class Update implements Action {
    readonly type = bookmarkTypes.UPDATE;
    constructor( public payload: any) {}
}

export class UpdateSucces implements Action {
    readonly type = bookmarkTypes.UPDATE_SUCCESS;
    constructor ( public payload: any) { }
}

export class UpdateFaild implements Action {
    readonly type = bookmarkTypes.UPDATE_FAILD;
    constructor(public payload: ErrorData) {}
}

export class Delete implements Action {
    readonly type = bookmarkTypes.DELETE;
    constructor(public payload: string) {}
}

export class DeleteSucces implements Action {
    readonly type = bookmarkTypes.DELETE_SUCCESS;
    constructor( public payload: any) {}
}

export class DeleteFaild implements Action {
    readonly type = bookmarkTypes.DELETE_FAILD;
    constructor(public payload: ErrorData) {}
}

export class AddBookmark implements Action {
    readonly type = bookmarkTypes.ADD_BOOKMARK;
    constructor(public payload: any) {}
}

export class AddBookmarkSuccess implements Action {
    readonly type = bookmarkTypes.ADD_BOOKMARK_SUCCESS;
    constructor(public payload: any ) {}
}

export class AddBookmarkFaild implements Action {
    readonly type = bookmarkTypes.ADD_BOOKMARK_FAILD;
    constructor(public payload: ErrorData) {}
}


export type All =
    |SetCurrentBookmark
    |Fetch
    |FetchSuccess
    |FetchFaild
    |Update
    |UpdateSucces
    |UpdateFaild
    |Delete
    |DeleteSucces
    |DeleteFaild
    |AddBookmark
    |AddBookmarkSuccess
    |AddBookmarkFaild;
