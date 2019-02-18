import { Action } from '@ngrx/store';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { ErrorData } from 'src/document/models/error.model';

export enum bookmarkTypes {
    SET_CURRENT_BOOKMARK = '[BOOKMARK] SET CURRENT BOOKMARK',

    FETCH_BOOKMARK = '[BOOKMARK] FETCH BOOKMARK',
    FETCH_BOOKMARK_SUCCESS = '[BOOKMARK] FETCH BOOKMARK SUCCESS',
    FETCH_BOOKMARK_FAILD = '[BOOKMARK] FETCH BOOKMARK FAILD',

    UPDATE = '[BOOKMARK] UPDATE',
    UPDATE_SUCCESS = '[BOOKAMARK] UPDATE SUCCESS',
    UPDATE_FAILD = '[BOOKMARK] UPDATE FAIL',

    DELETE = '[BOOKMARK] DELETE',
    DELETE_SUCCESS = '[BOOKMARK] DELETE SUCCESS',
    DELETE_FAILD = '[BOOKMARK] DELETE FAILD',

    ADD_BOOKMARK = '[BOOKMARK] ADD BOOKMARK',
    ADD_BOOKMARK_SUCCESS = '[BOOKMARK] ADD BOOKMARK SUCCESS',
    ADD_BOOKMARK_FAILD = '[BOOKMARK] ADD BOOKMARK FAILD'
}

export class SetCurrentBookmark implements Action {
    readonly type = bookmarkTypes.SET_CURRENT_BOOKMARK;
    constructor(public payload: BookmarkModel) {}
}

export class FetchBookmark implements Action {
    readonly type = bookmarkTypes.FETCH_BOOKMARK;
}

export class FetchBookmarkSuccess implements Action {
    readonly type = bookmarkTypes.FETCH_BOOKMARK_SUCCESS;
    constructor( public payload: BookmarkModel[]) { }
}

export class FetchBookmarkFaild implements Action {
    readonly type = bookmarkTypes.FETCH_BOOKMARK_FAILD;
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
    |FetchBookmark
    |FetchBookmarkSuccess
    |FetchBookmarkFaild
    |Update
    |UpdateSucces
    |UpdateFaild
    |Delete
    |DeleteSucces
    |DeleteFaild
    |AddBookmark
    |AddBookmarkSuccess
    |AddBookmarkFaild;
