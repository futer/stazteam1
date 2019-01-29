import * as bookmarkState from './bookmark.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as bookmarkActions from './bookmark.actions';
import { identifierModuleUrl } from '@angular/compiler';
import { Action } from 'rxjs/internal/scheduler/Action';


export const initialState: bookmarkState.BookmarkState = {
    currentBookmarkId: null,
    bookmarks: [],
    erroMessage: null,
};

export const bookmarkFeature = createFeatureSelector<bookmarkState.BookmarkState>('bookmarks');

export const getCurrentBookmarkId = createSelector (
    bookmarkFeature,
    state => state.currentBookmarkId
);

export const getBookmarks = createSelector (
    bookmarkFeature,
    state => state.bookmarks
);

export const getError = createSelector (
    bookmarkFeature,
    state => state.erroMessage
);

export const getCurrentBookmark = createSelector(
    bookmarkFeature,
    getCurrentBookmarkId,
    (state, currentBookmarkId ) => {
        if ( currentBookmarkId) {
            return state.bookmarks.find(b => b.id === currentBookmarkId);
        } else {
            return null;
        }
    }

);

export function bookmarkReducer(
    state: bookmarkState.BookmarkState = initialState,
    action: bookmarkActions.All
): bookmarkState.BookmarkState {
    switch (action.type) {
        case bookmarkActions.bookmarkTypes.SET_CURRENT_BOOKMARK:
        return {
            ...state,
            currentBookmarkId: action.payload.id
        };

        case bookmarkActions.bookmarkTypes.FETCH_SUCCESS:
        return {
           ...state,
           bookmarks: action.payload,
           erroMessage: null
       };

        case bookmarkActions.bookmarkTypes.FETCH_FAILD:
        return{
            ...state,
            bookmarks: [],
            erroMessage: action.payload
        };

        case bookmarkActions.bookmarkTypes.UPDATE_SUCCESS:
            return {
                ...state,
                bookmarks: state.bookmarks.map(
                    item => action.payload.payload.id
                         === item.id
                         ? action.payload.payload
                         : item
                        )
            };

        case bookmarkActions.bookmarkTypes.UPDATE_FAILD:
        return {
            ...state,
            erroMessage: action.payload
        };

        case bookmarkActions.bookmarkTypes.DELETE_SUCCESS:
        console.log(action.payload);
        return {
            ...state,
            // bookmarks: state.bookmarks.map(
            //     item => action.payload.payload
            //         === item.id
            //         ? action.payload.payload
            //         : item),
            bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== action.payload.payload ),
            currentBookmarkId: null,
            erroMessage: null
        };

        case bookmarkActions.bookmarkTypes.DELETE_FAILD:
        return {
            ...state,
            erroMessage: action.payload
        };

        default:
        return state;

    }
}
export default bookmarkReducer;
export const getBookmarksSubpage = (state: bookmarkState.BookmarkState) => state.bookmarks;
